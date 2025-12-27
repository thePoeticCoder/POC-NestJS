import { CollectionOf, Description, Enum, Minimum, Property, Required } from "@tsed/schema";
import { BasePlanTypeEnum } from "../../common/enums-and-constants/global.enum";
import { BasePlanDesignSchema } from "../common/basePlanDesign";
import { BasePlanRules } from "../common/basePlanRules";
import { BenefitResp } from "../common/benefit";


export class BasePlanResp {

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
    @Description("BasePlan Description to display in webui navbar")
    basePlanNavText: string;

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
    @Description("Reference to active questionnaire in Questionnaire collection")
    @Required()
    basePlanActiveQuestionaire: string

    @Property()
    @CollectionOf(BenefitResp)
    @Required()
    @Description("Array of Benefits")
    benefits: BenefitResp[];

    @Property()
    @CollectionOf(String)
    @Description("Array of tags")
    basePlanTags: string[];

    @Property()
    @Description("Filter for display")
    basePlanIsPublic: boolean;

    @Property()
    @Required()
    @Enum(BasePlanTypeEnum)
    @Description("type of base-plan")
    basePlanType: BasePlanTypeEnum;


    @Property()
    @Required()
    @Minimum(0)
    @Description("used for sorting only , more value , implies high priority")
    basePlanPriority: number;

    @Property()
    @Required()
    @Description("Color and background information for frontend")
    basePlanDesign: BasePlanDesignSchema;


    @Property()
    @CollectionOf(String)
    @Description("Array of bullet points for UI")
    basePlanHighlights: string[];



    @Property()
    @Required()
    @Description("Color and background information for frontend")
    basePlanRules: BasePlanRules;

};



