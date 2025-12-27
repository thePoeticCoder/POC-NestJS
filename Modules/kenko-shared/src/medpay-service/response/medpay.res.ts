import { Property } from "@tsed/schema";
import { InvoiceDetails } from "../../marketplace-service";


export class BaseItem {
  @Property()
  item?: string;
  @Property()
  amount?: string;
  @Property()
  quantity?: number;
  @Property()
  composition?: string;
  @Property()
  gst?: string;
  @Property()
  sku_id?: string;
  @Property()
  details?: string;
  @Property()
  MRP?: string;
  @Property()
  change_type?: string;
  @Property()
  HSNCode?: string;
  @Property()
  manufacturer?: string;
}
export class RequestedItem extends BaseItem {}

export class Item extends BaseItem {
  @Property()
  requestedItem?: RequestedItem;
}
export class OrderDetails {
  @Property()
  doctor?: string;
  @Property()
  prescription_link?: string;
  @Property()
  items?: Item[];
}

export class MedpayInvoiceDetails {
  @Property()
  bill_amount?: string;
  @Property()
  invoice_no?: string;
  @Property()
  payment_status?: string;
  @Property()
  invoice_id?: string;
  @Property()
  discount?: string;
  @Property()
  payment_collection?: string;
  @Property()
  net_amount?: string;
  @Property()
  invoice_link?: string;
}
export class Medpay {
  @Property()
  partner_order_id?: string;
  @Property()
  partner_name?: string;
  @Property()
  order_status?: string;
  @Property()
  order_details?: OrderDetails;
  @Property()
  invoiceDetails?: InvoiceDetails;
}



export class MedpayError {
  errors?: { [key: string]: string };
  message?: string;
  [key: string]: any;
}