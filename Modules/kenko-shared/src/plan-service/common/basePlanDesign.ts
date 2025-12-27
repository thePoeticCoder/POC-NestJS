import { Description, Property, Required } from "@tsed/schema";

export class BasePlanDesignSchema {

    @Property()
    @Required()
    @Description("Background color of plan list card")
    planListCardBackgroundColor: string

    @Property()
    @Required()
    @Description("Logo image of plan")
    planLogoImage: string

    @Property()
    @Required()
    @Description("Background color of plan logo")
    planLogoBackgroundColor: string

    @Property()
    @Required()
    @Description("Icon color of collapse button in plan details")
    planCollapseButton: string

    @Property()
    @Required()
    @Description("Toolbar wave color of plan details")
    planDetailsToolbarWaveColor: string
}