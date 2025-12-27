import { Description, Property } from '@tsed/schema';

export class InvoiceDetails {
  @Property()
  @Description('Invoice Id')
  invoiceId: string;

  @Property()
  @Description('Invoice Link')
  invoiceLink: string;

  @Property()
  @Description('Net Amount')
  netAmount: string;

  @Property()
  @Description('Payment Status')
  paymentStatus: string;

  @Property()
  @Description('Bill Amount')
  billAmount: string;

  @Property()
  @Description('Discount')
  discount: string;
}
