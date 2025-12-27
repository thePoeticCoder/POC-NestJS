
import { CollectionOf, Property, Required } from "@tsed/schema";
import { PaymentOption } from "../../schema/paymentOption.schema";
import { ZohoLineItem } from "../../schema/zohoLineItem.schema";

export class CreateZohoInvoiceReq {

    @Property()
    type?: string;

    @Property()
    reference_invoice_type?: string;

    @Property()
    reason_for_debit_note?: string;

    @Property()
    reference_number?: number;

    @Property()
    @Required()
    customer_id: string;

    @Property()
    @Required()
    @CollectionOf(String)
    contact_persons: string[];

    @Property()
    @Required()
    date: string;

    @Property()
    @Required()
    payment_terms:number;

    @Property()
    @Required()
    payment_terms_label: string;

    @Property()
    @Required()
    due_date: string;
    
    @Property()
    @Required()
    @CollectionOf(ZohoLineItem)
    line_items: ZohoLineItem[];

    @Property()
    payment_options?: PaymentOption;

    @Property()
    @Required()
    tax_id:number

    @Property()
    adjustment?: number;

    @Property()
    adjustment_description?: string;
}