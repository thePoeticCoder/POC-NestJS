import {
  MiscMessages,
  PlanPhaseEnum,
  QueueEventNew,
  SchedulerServiceEventEnum,
  SchedulerServiceGenericEvent,
  Services,
} from '@kenko-health/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ChannelWrapper } from 'amqp-connection-manager';
import { QueueFactoryService } from '../../common/queue/queueFactory.service';
import { ErrorHandlerService } from '../../common/services/errorHandler.service';
import { LogService } from '../../common/services/log.service';
import { AppConfig } from '../../config';
import { ProcessedEventsDao } from '../../dao/processedEvents.dao';
import { ZohoService } from '../../modules/zoho/zoho.service';

@Injectable()
export class SchedulerConsumerService {
  @Inject()
  private logService: LogService;

  @Inject()
  private errorHandlerService: ErrorHandlerService;

  @Inject()
  private queueFactory: QueueFactoryService;

  @Inject()
  private zohoService: ZohoService;

  private channel: ChannelWrapper;

  @Inject()
  private processedEventsDao: ProcessedEventsDao;

  constructor() {
    setTimeout(() => {
      this.consumptionSetup();
    }, 5 * 1000);
  }

  consumptionSetup(): void {
    const ctxId = Services.SCHEDULER;
    this.channel = this.queueFactory.getChannel(ctxId);
    this.channel.waitForConnect().then(() => {
      const consumeFromQueue = `${Services.SCHEDULER}.${Services.PAYMENT}`;
      this.channel.assertQueue(consumeFromQueue, {
        durable: true,
        exclusive: false,
      });
      this.logService.info(
        ctxId,
        `[SchedulerConsumerService] Listening for messages from queue=[${consumeFromQueue}]`,
      );
      this.channel.consume(consumeFromQueue, this.process.bind(this));
    });
  }

  async process(data: any): Promise<void> {
    const message = JSON.parse(data.content.toString());
    const parsedData: QueueEventNew<SchedulerServiceGenericEvent> = JSON.parse(
      String.fromCharCode(...message.data),
    );
    const { logId, eventName, source } = parsedData;
    this.logService.info(
      logId,
      `1st log inside handleEvents , source=[${source}] , event=[${eventName}]`,
    );

    const foundInDb = await this.processedEventsDao.findByLogIdAndEventName(
      logId,
      eventName,
    );

    //step-1 : if already processed event , do not reprocess it , just ACK and leave
    if (foundInDb) {
      this.logService.info(
        logId,
        `found in DB eventName=[${eventName}], logId=[${logId}] , so not processing again`,
      );
      this.channel.ack(data);
      return;
    }

    try {
      switch (eventName) {
        case SchedulerServiceEventEnum.PLAN_PHASE_TRANSITION:
          await this.createInvoice(logId, parsedData);
          break;
      }
      //ack data
      await this.processedEventsDao.create({
        logId,
        eventName,
        source,
        event: parsedData as any,
        eventData: parsedData.eventData as any,
      });

      //step-4 : ACK
      this.logService.info(
        logId,
        `processing done , saved event in db , sending ack !!`,
      );
      this.channel.ack(data);
    } catch (e) {
      this.errorHandlerService.handleError(e, logId, {
        methodName: `process, ${eventName}`,
        sendErrorNotification: true,
      });
      if (AppConfig.isProd) {
        this.channel.nack(data);
      } else {
        this.channel.ack(data);
      }
    }
  }
  async createInvoice(
    logId: string,
    parsedData: QueueEventNew<SchedulerServiceGenericEvent>,
  ) {
    this.logService.info(
      logId,
      `inside createInvoice , source=[${parsedData.source}] , event=[${parsedData.eventName}]`,
    );
    const { eventData } = parsedData;
    this.logService.info(logId, `eventData=[${JSON.stringify(eventData)}]`);
    const { planCurrentPhase } = eventData;
    this.logService.info(logId, `planCurrentPhase=[${planCurrentPhase}]`);
    if (planCurrentPhase !== PlanPhaseEnum.RENEWAL) {
      return MiscMessages.NO_OPERATION;
    }
    await this.zohoService.createInvoiceByEvent(logId, eventData);
    this.logService.info(logId, `successfully executed event=[createInvoice]`);
    return MiscMessages.SUCCESS;
  }
}
