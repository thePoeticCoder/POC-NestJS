
import { Property, Required } from "@tsed/schema";

export class PaymentServiceDiscountReq {
    @Property()
    @Required()
    userId: string;
}