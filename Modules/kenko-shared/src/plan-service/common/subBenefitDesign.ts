import { Description, Property, Required } from "@tsed/schema"

export class SubBenefitDesign {

    @Property()
    @Required()
    @Description("Logo/Icon of subbenefit")
    subBenefitLogo: string

    @Property()
    @Required()
    @Description("Logo/Icon color of subbenefit")
    subBenefitLogoColor: string

    @Property()
    @Required()
    @Description("Background color of subbenefit")
    subBenefitBackgroundColor: string
}