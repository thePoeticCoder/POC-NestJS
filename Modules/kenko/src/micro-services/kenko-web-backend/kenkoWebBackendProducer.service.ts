import {
  QueueEventNew,
  EventActions,
  Services,
  PaymentServiceEventEnum,
  ZohoCustomerIdEvent,
  PostInvoiceCreationEvent,
} from '@kenko-health/shared';
import { Inject, Injectable } from '@nestjs/common';
import { QueueFactoryService } from '../../common/queue/queueFactory.service';
import { CommonService } from '../../common/services/common.service';
import { ErrorHandlerService } from '../../common/services/errorHandler.service';
import { LogService } from '../../common/services/log.service';
import { AppConfig } from '../../config';
import { QueueConstants } from '../../constants/appConstants';
@Injectable()
export class KenkoWebBackendProducerService {
  @Inject()
  private queueFactoryService: QueueFactoryService;

  @Inject()
  private logService: LogService;

  @Inject()
  private errorHandlerService: ErrorHandlerService;

  @Inject()
  private commonService: CommonService;

  async sendZohoCustomerIdEvent(ctxId: string, userDetails: any) {
    try {
      const ctx = ctxId;
      this.logService.info(ctx, `inside sendZohoCustomerIdEvent...`);
      const {
        emailId,
        hubspotContactId: crmId,
        userCollectionId: userId,
        zohoCustomerId,
      } = userDetails;
      const eventLogId = ctxId;

      //make event
      const event: QueueEventNew<ZohoCustomerIdEvent> =
        new QueueEventNew<ZohoCustomerIdEvent>(
          eventLogId,
          PaymentServiceEventEnum.ZOHO_CUSTOMER_ID_UPDATE,
          EventActions.UPDATE,
          `${AppConfig.appName}`,
          { zohoCustomerId },
          Services.KWB,
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
        `successfully executed sendZohoCustomerIdEvent , _id=[${ctx}] ,  userId=[${userId}] , zohoCustomerId=[${zohoCustomerId}]`,
      );
    } catch (e) {
      this.errorHandlerService.handleError(e, ctxId, {
        methodName: 'sendZohoCustomerIdEvent',
        sendErrorNotification: true,
      });
    }
  }
  async postInvoiceCreationEvent(
    ctxId: string,
    userDetails: any,
    data: PostInvoiceCreationEvent,
  ) {
    try {
      const ctx = ctxId;
      this.logService.info(ctx, `inside postInvoiceCreationEvent...`);
      const {
        emailId,
        hubspotContactId: crmId,
        userCollectionId: userId,
      } = userDetails;
      const { currentPlanId, invoiceId, invoiceUrl } = data;
      const eventLogId = `${ctx}`;

      //make event
      const event: QueueEventNew<PostInvoiceCreationEvent> =
        new QueueEventNew<PostInvoiceCreationEvent>(
          eventLogId,
          PaymentServiceEventEnum.POST_ZOHO_INVOICE_CREATION,
          EventActions.UPDATE,
          `${AppConfig.appName}`,
          { currentPlanId, invoiceId, invoiceUrl },
          Services.KWB,
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
        `successfully executed postInvoiceCreationEvent , _id=[${ctx}] ,  userId=[${userId}] , planId=[${currentPlanId}] , invoiceId=[${invoiceId}]`,
      );
    } catch (e) {
      this.errorHandlerService.handleError(e, ctxId, {
        methodName: 'postInvoiceCreationEvent',
        sendErrorNotification: true,
      });
    }
  }
}
