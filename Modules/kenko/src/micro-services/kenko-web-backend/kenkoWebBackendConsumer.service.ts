import {
  PaymentServiceEventEnum,
  QueueEventNew,
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
export class KenkoWebBackendConsumerService {
  @Inject()
  private logService: LogService;

  @Inject()
  private errorHandlerService: ErrorHandlerService;

  @Inject()
  private queueFactory: QueueFactoryService;

  private channel: ChannelWrapper;

  @Inject()
  private zohoService: ZohoService;

  @Inject()
  private processedEventsDao: ProcessedEventsDao;

  constructor() {
    setTimeout(() => {
      this.consumptionSetup();
    }, 5 * 1000);
  }

  consumptionSetup(): void {
    const ctxId = Services.KWB;
    this.channel = this.queueFactory.getChannel(ctxId);
    this.channel.waitForConnect().then(() => {
      const consumeFromQueue = `${Services.KWB}.${Services.PAYMENT}`;
      this.channel.assertQueue(consumeFromQueue, {
        durable: true,
        exclusive: false,
      });
      this.logService.info(
        ctxId,
        `[KenkoWebBackendConsumerService] Listening for messages from queue=[${consumeFromQueue}]`,
      );
      this.channel.consume(consumeFromQueue, this.process.bind(this));
    });
  }

  async process(data: any): Promise<void> {
    const message = JSON.parse(data.content.toString());
    const parsedData: QueueEventNew<any> = JSON.parse(
      String.fromCharCode(...message.data),
    );
    const { logId, eventName, source, eventData } = parsedData;
    this.logService.info(
      logId,
      `inside handleEvents , source=[${source}] , event=[${eventName}]`,
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
        case PaymentServiceEventEnum.ZOHO_PAYMENT_WEBHOOK:
          const result = await this.zohoService.handleZohoWebhookEvent(
            logId,
            parsedData,
          );
          this.logService.info(logId, `result=[${result}]`);
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
}
