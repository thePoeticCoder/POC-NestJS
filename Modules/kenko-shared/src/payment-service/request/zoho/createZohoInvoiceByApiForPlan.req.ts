
import { Property, Required } from "@tsed/schema";

export class CreateZohoInvoiceByApiForPlanReq {

    @Property()
    @Required()
    hubspotContactId: string;

    @Property()
    @Required()
    emailId: string;

    @Property()
    @Required()
    planName: string;

    @Property()
    @Required()
    duration: number;

    @Property()
    @Required()
    invoiceDate: string;

    @Property()
    @Required()
    discount: number;

    @Property()
    isPercentage?: boolean;

    @Property()
    isNumeric?: boolean;

}