import { CollectionOf, Description, Enum, Minimum, Nullable, Property, Required } from "@tsed/schema";
import { BenefitTypeEnum, SubBenefitTypeEnum, SubBenefitUnit } from "../../common/enums-and-constants/global.enum";
import { SubBenefitDesign } from "./subBenefitDesign";


export class SubBenefitResp {

    @Property()
    subBenefitCollectionId: string;

    @Property()
    @Required()
    @Description("Sub-Benefit Name")
    subBenefitName: string;

    @Enum(SubBenefitTypeEnum)
    @Required()
    @Description("Sub-Benefit Type (Boolean/Numeric/Percentage)")
    subBenefitType: SubBenefitTypeEnum;

    @Property()
    @Required()
    @Description("Sub-Benefit Description")
    subBenefitDescription: string;

    // @Property()
    // @Description("Sub-Benefit Duration")
    // subBenefitDuration: number;

    // @Property()
    // @Minimum(0)
    // @Description("Sub-Benefit Price")
    // subBenefitPrice: number;

    @Property()
    @Minimum(0)
    coverAmount: number;

    @Property()
    @Required()
    @Description("Sub-Benefit numeric factor eg. 10% Discount on Consultations")
    subBenefitFactor: number;

    @Property()
    @Required()
    @Description("Sub-Benefit usage eg. 1000 of (50000 -> factor) coverage used")
    subBenefitUsage: number;

    @Enum(SubBenefitUnit)
    @Required()
    @Description("Sub-Benefit unit (Days/Rs. Sum Insured)")
    @Nullable(SubBenefitUnit)
    subBenefitUnit: SubBenefitUnit | null;

    @Property()
    @CollectionOf(String)
    @Description("Sub-Benefit documents required for order")
    subBenefitRequiredDocuments: string[];

    @Property()
    @Enum(BenefitTypeEnum)
    @Required()
    @Description("Parent Benefit Type")
    parentBenefitType: BenefitTypeEnum;

    @Property()
    @Required()
    @Description("Design information of subBenefit for frontend")
    subBenefitDesign: SubBenefitDesign;

};