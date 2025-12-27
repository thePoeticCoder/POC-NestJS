import { CollectionOf, Description, Enum, Property, Required } from "@tsed/schema";
import { BenefitTypeEnum } from "../../common/enums-and-constants/global.enum";
import { SubBenefitResp } from "./subBenefit";


export class BenefitResp {

    @Property()
    benefitCollectionId: string;

    @Property()
    @Required()
    @Description("Benefit Name")
    benefitName: string;

    @Property()
    @Enum(BenefitTypeEnum)
    @Required()
    @Description("Benefit Type")
    benefitType: BenefitTypeEnum;

    @Property()
    @Required()
    @Description("Benefit Description")
    benefitDescription: string;

    @Property()
    @Required()
    benefitFactor: number;

    @Property()
    @Description("Benefit text to concatenate before description for display")
    @Required()
    benefitPrefix: string;


    @Property()
    @CollectionOf(SubBenefitResp)
    @Required()
    @Description("Array of embedded sub-Benefit Documents")
    subBenefits: SubBenefitResp[];

    @Property()
    @CollectionOf(String)
    @Required()
    @Description("Array of required Documents")
    requiredDocuments: string[];


};
