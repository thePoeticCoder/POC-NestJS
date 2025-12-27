


import { Property, Required } from "@tsed/schema";

export class GetPlayerIdReq {

    @Property()
    @Required()
    userId: string;

    @Property()
    userPlanId: string;

    @Property()
    @Required()
    userPlanName: string;
};