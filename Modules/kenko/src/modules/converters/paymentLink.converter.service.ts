import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { uuid } from 'uuidv4';
import { LogService } from '../../common/services/log.service';

@Injectable()
export class PaymentLinkConverterService {
  @Inject()
  private logService: LogService;

  async createPaymentLinkBody(ctxId: string, body: any) {
    this.logService.info(ctxId, `inside createPaymentLinkBody method`);
    const paymentLink: Prisma.PaymentLinkCreateInput = {
      userCollectionId: body.userCollectionId,
      paymentLinkId: `${uuid()}-${new Date().getTime()}`,
      transaction: {
        connect: {
          id: body.transactionId,
        },
      },
      zohoInvoiceId: body.zohoInvoiceId,
      zohoRecurringProfileId: body.zohoRecurringProfileId,
      invoiceUrl: body.invoiceUrl,
      utmSource: '',
    };
    this.logService.info(
      ctxId,
      `successfully executed method=[createPaymentLinkBody]`,
    );
    return paymentLink;
  }
}
