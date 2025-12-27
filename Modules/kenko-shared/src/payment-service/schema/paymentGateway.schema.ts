import { CollectionOf, Property, Required } from "@tsed/schema";

export class PaymentGateway{

    @Property()
    @Required()
    gateway_name : string;
}