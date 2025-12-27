import { Description, Property } from '@tsed/schema';

export class ZohoInvoiceDetails {
  @Property()
  @Description('Invoice Id')
  invoiceId: string;

  @Property()
  @Description('KWB Transaction ID')
  kenkoTransactionId: string;

  @Property()
  @Description('Invoice Link')
  invoiceLink: string;

  @Property()
  @Description('Invoice Date')
  invoiceDate: string;

  @Property()
  @Description('Invoice Number')
  invoiceNumber: string;

  @Property()
  @Description('Payment Status')
  paymentStatus: string;

  @Property()
  @Description('Coupon Discount')
  couponDiscount: string;

  @Property()
  @Description('Kenko Discount')
  kenkoDiscount: string;

  @Property()
  @Description('Medpay Discount')
  medpayDiscount: string;

  @Property()
  @Description('Delivery Charge')
  deliveryCharge: string;

  @Property()
  @Description('Final Amount')
  finalAmount: string;

  @Property()
  @Description('Amount')
  amount: string;

  @Property()
  @Description('Tax Amount')
  taxAmount: string;
}
