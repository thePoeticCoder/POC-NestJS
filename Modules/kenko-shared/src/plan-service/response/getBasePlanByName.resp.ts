import { Description, Enum, Minimum, Property, Required } from "@tsed/schema";
import { BasePlanTypeEnum } from "../../common/enums-and-constants/global.enum";


export class GetBasePlanByNameResp {

    @Property()
    @Required()
    _id: string;

    @Property()
    @Required()
    @Description("Base Plan Name")
    basePlanName: string;

    @Property()
    @Required()
    @Description("Base Plan Description")
    basePlanDescription: string;

    @Property()
    @Required()
    @Description("Base Plan Name")
    basePlanScoreRequired: number;

    @Property()
    @Description("Base Plan Duration")
    @Required()
    basePlanDuration: number;

    @Property()
    @Minimum(0)
    @Description("Base Plan Price")
    @Required()
    basePlanPrice: number;

    @Property()
    @Description("Base Plan addon discount")
    discount: number;

    @Property()
    @Description("Base Plan addon price increase")
    priceIncrease: number;

    @Property()
    @Description("Filter for display")
    basePlanIsPublic: boolean;

    @Property()
    @Required()
    @Enum(BasePlanTypeEnum)
    @Description("type of base-plan")
    basePlanType: BasePlanTypeEnum;


};



