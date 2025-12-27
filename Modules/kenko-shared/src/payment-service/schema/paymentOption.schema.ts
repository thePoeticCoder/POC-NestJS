import { CollectionOf, Property, Required } from "@tsed/schema";
import { PaymentGateway } from "./paymentGateway.schema";

export class PaymentOption {

    @Property()
    @Required()
    @CollectionOf(PaymentGateway)
    payment_gateways : PaymentGateway[];
}