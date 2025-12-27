
import { Property, Required } from "@tsed/schema";

export class PaymentServiceDiscountResp {
    @Property()
    @Required()
    discountPercent: number;

    @Property()
    @Required()
    discountAmount: number;

    @Property()
    @Required()
    invoiceUrl: string;


    @Property()
    planPrice: number;


    @Property()
    finalInvoiceAmount: number;

}