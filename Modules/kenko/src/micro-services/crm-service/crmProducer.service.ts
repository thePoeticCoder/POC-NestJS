import {
  QueueEventNew,
  EventActions,
  Services,
  PaymentServiceEventEnum,
  ZohoCustomerIdEvent,
  UniquePaymentLinkEvent,
} from '@kenko-health/shared';
import { Inject, Injectable } from '@nestjs/common';
import { QueueFactoryService } from '../../common/queue/queueFactory.service';
import { CommonService } from '../../common/services/common.service';
import { ErrorHandlerService } from '../../common/services/errorHandler.service';
import { LogService } from '../../common/services/log.service';
import { AppConfig } from '../../config';
import { QueueConstants } from '../../constants/appConstants';
@Injectable()
export class CRMProducerService {
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
          Services.CRM,
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
        sendErrorNotification: false,
      });
    }
  }
  async sendUniquePaymentLinkEvent(ctxId: string, userDetails: any, data: any) {
    try {
      const ctx = ctxId;
      this.logService.info(ctx, `inside sendUniquePaymentLinkEvent...`);
      const {
        emailId,
        hubspotContactId: crmId,
        userCollectionId: userId,
        zohoCustomerId,
      } = userDetails;
      const eventLogId = `${ctx}`;

      //make event
      const event: QueueEventNew<UniquePaymentLinkEvent> =
        new QueueEventNew<UniquePaymentLinkEvent>(
          eventLogId,
          PaymentServiceEventEnum.INVOICE_UNIQUE_LINK,
          EventActions.UPDATE,
          `${AppConfig.appName}`,
          data,
          Services.CRM,
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
        `successfully executed sendUniquePaymentLinkEvent , _id=[${ctx}] ,  userId=[${userId}] , zohoCustomerId=[${zohoCustomerId}]`,
      );
    } catch (e) {
      this.errorHandlerService.handleError(e, ctxId, {
        methodName: 'sendUniquePaymentLinkEvent',
        sendErrorNotification: false,
      });
    }
  }
}
