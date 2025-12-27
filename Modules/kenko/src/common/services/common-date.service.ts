import { Inject, Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { LogService } from './log.service';

@Injectable()
export class CommonDateService {
  @Inject()
  private logService: LogService;

  async getDateForZohoInvoice(
    ctxId: string,
    datePostFix: number,
    invoiceCreationDate: string,
  ) {
    this.logService.info(ctxId, `inside getDateForZohoInvoice method`);
    let date;
    if (invoiceCreationDate) {
      const [dd, mm, yyyy] = invoiceCreationDate.split('/');
      date = moment(`${yyyy}-${mm}-${dd}`)
        .add(datePostFix, 'days')
        .format('YYYY-MM-DD');
      return date;
    }
    date = moment()
      .utcOffset('+0530')
      .add(datePostFix, 'days')
      .format('YYYY-MM-DD');
    this.logService.info(
      ctxId,
      `successfully executed method=[CommonDateService]`,
    );
    return date;
  }
  convertPaymentDate(ctxId: string, zohoDate: any) {
    this.logService.info(ctxId, `inside convertPaymentDate method`);
    const paymentDateInZohoFormat = zohoDate.split('T');
    return `${paymentDateInZohoFormat[0]}`;
  }

  getInvoiceDate(ctxId: string) {
    this.logService.info(ctxId, `inside convertPaymentDate method`);
    return moment(new Date()).format('DD/MM/YYYY');
  }
}
