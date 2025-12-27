import {
  QueueEventNew,
  EventActions,
  Services,
  PaymentServiceEventEnum,
  RenewalLinkReadyEvent,
} from '@kenko-health/shared';
import { Inject, Injectable } from '@nestjs/common';
import { QueueFactoryService } from '../../common/queue/queueFactory.service';
import { CommonService } from '../../common/services/common.service';
import { ErrorHandlerService } from '../../common/services/errorHandler.service';
import { LogService } from '../../common/services/log.service';
import { QueueConstants } from '../../constants/appConstants';
@Injectable()
export class NotificationProducerService {
  @Inject()
  private queueFactoryService: QueueFactoryService;

  @Inject()
  private logService: LogService;

  @Inject()
  private errorHandlerService: ErrorHandlerService;

  @Inject()
  private commonService: CommonService;
  async renewalLinkReady(
    ctxId: string,
    userDetails: any,
    data: RenewalLinkReadyEvent,
  ) {
    try {
      const ctx = ctxId;
      this.logService.info(ctx, `inside renewalLinkReady...`);
      const {
        emailId,
        hubspotContactId: crmId,
        userCollectionId: userId,
      } = userDetails;
      const eventLogId = ctxId;

      //make event
      const event: QueueEventNew<RenewalLinkReadyEvent> =
        new QueueEventNew<RenewalLinkReadyEvent>(
          eventLogId,
          PaymentServiceEventEnum.RENEWAL_LINK_READY,
          EventActions.UPDATE,
          Services.PAYMENT,
          { ...data },
          Services.NOTIFICATION,
          { userId, crmId, emailId },
        );
      //convert event to buffer
      const routingKey = event.key;
      const dataToSend = Buffer.from(JSON.stringify(event));
      this.logService.info(
        ctx,
        `inside renewalLinkReady , routing-key=[${routingKey}]`,
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
        `successfully executed renewalLinkReady , _id=[${ctx}] ,  userId=[${userId}] , emailId=[${emailId}] , crmId=[${crmId}]`,
      );
    } catch (e) {
      this.errorHandlerService.handleError(e, ctxId, {
        methodName: 'renewalLinkReady',
        sendErrorNotification: true,
      });
    }
  }
}
