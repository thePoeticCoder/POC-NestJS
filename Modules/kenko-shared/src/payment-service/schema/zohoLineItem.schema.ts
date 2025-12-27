import { Property, Required } from "@tsed/schema";

export class ZohoLineItem {

    @Property()
    @Required()
    item_id: number;

    @Property()
    @Required()
    product_type: string;

    @Property()
    @Required()
    hsn_or_sac: number;

    @Property()
    @Required()
    name: string;

    @Property()
    @Required()
    description: string

    @Property()
    @Required()
    rate: number;

    @Property()
    @Required()
    quantity: number;

    @Property()
    @Required()
    discount_amount: number;

    @Property()
    @Required()
    discount: number;

    @Property()
    @Required()
    tax_id: number

}