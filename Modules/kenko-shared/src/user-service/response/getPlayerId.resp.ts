


import { Property } from "@tsed/schema";

export class GetPlayerIdResp {

    @Property()
    userExists: boolean;

    @Property()
    userPlanExists: boolean;

    @Property()
    userId: string;

    @Property()
    userName: string;

    @Property()
    userPlanId: string;

    @Property()
    userPlanName: string;

    @Property()
    playerId: string;

    @Property()
    paymentLink: string;
};