import {
  QueueEventNew,
  EventActions,
  Services,
  PaymentServiceEventEnum,
  PostPaymentEvent,
} from '@kenko-health/shared';
import { Inject, Injectable } from '@nestjs/common';
import { QueueFactoryService } from '../../common/queue/queueFactory.service';
import { CommonService } from '../../common/services/common.service';
import { ErrorHandlerService } from '../../common/services/errorHandler.service';
import { LogService } from '../../common/services/log.service';
import { AppConfig } from '../../config';
import { QueueConstants } from '../../constants/appConstants';
@Injectable()
export class CommonProducerService {
  @Inject()
  private queueFactoryService: QueueFactoryService;

  @Inject()
  private logService: LogService;

  @Inject()
  private errorHandlerService: ErrorHandlerService;

  @Inject()
  private commonService: CommonService;

  async sendPostPaymentEvent(
    ctxId: string,
    userDetails: any,
    postPaymentEvent: PostPaymentEvent,
  ) {
    try {
      const ctx = ctxId;
      this.logService.info(ctx, `inside postInvoiceCreationEvent...`);
      const {
        emailId,
        hubspotContactId: crmId,
        userCollectionId: userId,
      } = userDetails;
      const eventLogId = `${ctx}`;

      //make event
      const event: QueueEventNew<PostPaymentEvent> =
        new QueueEventNew<PostPaymentEvent>(
          eventLogId,
          PaymentServiceEventEnum.PAYMENT_MADE,
          EventActions.UPDATE,
          `${AppConfig.appName}`,
          postPaymentEvent,
          null,
          { userId, crmId, emailId },
        );
      //convert event to buffer
      const routingKey = event.key;
      const dataToSend = Buffer.from(JSON.stringify(event));
      this.logService.info(
        ctx,
        `inside sendPlanTransitionEvent , routing-key=[${routingKey}]`,
      );

      //send event
      await this.queueFactoryService
        .getChannel(Services.PAYMENT)
        .publish(
          QueueConstants.PAYMENT_SERVICE_EXCHANGE_NAME,
          routingKey,
          dataToSend,
          {
            timeout: 500,
          },
        );

      //log send confirmation
      this.logService.info(
        ctx,
        `successfully executed sendPostPaymentEvent , _id=[${ctx}] ,  userId=[${userId}] , emailId=[${emailId}] , crmId=[${crmId}]`,
      );
    } catch (e) {
      this.errorHandlerService.handleError(e, ctxId, {
        methodName: 'sendPostPaymentEvent',
        sendErrorNotification: true,
      });
    }
  }
}
