import { Property } from "@tsed/schema";

export class PaymentDetailsResponse {
    @Property()
    reference_id: string;

    @Property()
    net_amount: string;

    @Property()
    delivery_fee_exclusive: string;

    @Property()
    delivery_partner: string;

    @Property()
    payment_type: string;

    @Property()
    payment_timestamp: string;
}