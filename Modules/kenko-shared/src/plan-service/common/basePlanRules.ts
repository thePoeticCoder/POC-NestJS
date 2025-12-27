import { CollectionOf, Description, Property } from "@tsed/schema";

export class BasePlanRules {


    @Property()
    @CollectionOf(Number)
    @Description("Array of bullet points for UI")
    allowedAgeRange: number[];


    @Property()
    @CollectionOf(Number)
    @Description("Array of bullet points for UI")
    allowedScoreRange: number[];



    @Property()
    @CollectionOf(Boolean)
    @Description("Filter for display")
    isDiabetesAllowed: boolean[];
};

