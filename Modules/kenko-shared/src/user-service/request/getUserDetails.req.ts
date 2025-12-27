import { Description, Property } from "@tsed/schema";

export class GetUserDetailsReq {

    @Property()
    @Description("User Id")
    userId?: string;

    @Property()
    @Description("User email")
    emailId?: string;

    @Property()
    @Description("User hubspotId")
    hubspotContactId?: string;

    @Property()
    @Description("User phone")
    phoneNo?: number;

    @Property()
    @Description("User hubspotId")
    planName?: string;

    @Property()
    @Description("User current plan id")
    currentPlanId?: string;
    
};