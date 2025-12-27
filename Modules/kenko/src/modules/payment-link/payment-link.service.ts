import { PaymentResponseStatusEnum } from '@kenko-health/shared';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TransactionDao } from '../../dao/transaction.dao';
import { PaymentLinkDao } from '../../dao/payment-link.dao';
import { LogService } from '../../common/services/log.service';

@Injectable()
export class PaymentLinkService {
  @Inject(PaymentLinkDao)
  private paymentLinkDao: PaymentLinkDao;

  @Inject(TransactionDao)
  private transactionDao: TransactionDao;

  @Inject()
  private logService: LogService;

  async getInvoiceLinkById(
    ctxId: string,
    paymentLinkId: string,
    utmSource: string,
  ) {
    this.logService.info(ctxId, `inside getZohoHeader method`);
    const paymentLinkDb = await this.paymentLinkDao.findByPaymentLink(
      paymentLinkId,
    );
    if (!paymentLinkDb) {
      this.logService.info(ctxId, `payment link not found`);
      throw new NotFoundException('Payment link not found');
    }
    this.logService.info(
      ctxId,
      `payment link found with this id=[${paymentLinkId}]`,
    );
    const { invoiceUrl, transactionId, id } = paymentLinkDb;
    const transactionDoc = await this.transactionDao.findById(transactionId);
    if (
      transactionDoc &&
      transactionDoc.status === PaymentResponseStatusEnum.PAID
    ) {
      this.logService.info(
        ctxId,
        ` transactionDocStatus=[${transactionDoc.status}]`,
      );
      return invoiceUrl;
    }
    if (utmSource) {
      this.logService.info(ctxId, ` utmSource=[${utmSource}]`);
      await this.paymentLinkDao.updateById(id, { utmSource });
      return invoiceUrl;
    }
    return invoiceUrl;
  }
}
