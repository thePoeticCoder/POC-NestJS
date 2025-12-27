
import { CollectionOf, Property, Required } from "@tsed/schema";



export class ComplexQuestionCreateReq {

    @Property()
    @Required()
    name: string;

    @Property()
    @Required()
    description: string;

    @Property()
    @Required()
    isRedFlag: boolean;

    @Property()
    @Required()
    toCalculate: boolean;

    @Property()
    @CollectionOf(String)
    @Required()
    sqColNames: string[];

    @Property()
    @Required()
    @CollectionOf(String)
    scoreMap: string[];

    @Property()
    @Required()
    maxPossibleRawScore: number;

    @Property()
    @Required()
    defaultRawScore: number;


}