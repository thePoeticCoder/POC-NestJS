import { ComplexQuestionQz, RuleBasedSimpleQuestionQz, SimpleQuestionQz } from "./quizFetch.resp";
import { CollectionOf, Description, Property, Required } from "@tsed/schema";


export class GroupWithinPageQz {


    @Property()
    @Required()
    groupSize: number;


    @Property()
    @Required()
    groupOrder: number;


    @Property()
    @Required()
    @CollectionOf(SimpleQuestionQz)
    @Description("embedded simple questions")
    simpleQuestions: SimpleQuestionQz[];


    @Property()
    @Required()
    @CollectionOf(ComplexQuestionQz)
    @Description("embedded simple questions")
    complexQuestions: ComplexQuestionQz[];


    @Property()
    @Required()
    @CollectionOf(RuleBasedSimpleQuestionQz)
    @Description("embedded simple questions")
    ruleBasedSimpleQuestions: RuleBasedSimpleQuestionQz[];
}


export class QuizPage {


    @Property()
    @Required()
    @Description("same as questionaire name")
    pageNo: number;


    @Property()
    @Required()
    @Description("same as questionaire name")
    categoryTag: string;


    @Property()
    imgDesktop: string;



    @Property()
    imgMobile: string;




    @Property()
    @Required()
    @CollectionOf(GroupWithinPageQz)
    groups: GroupWithinPageQz[];

}


