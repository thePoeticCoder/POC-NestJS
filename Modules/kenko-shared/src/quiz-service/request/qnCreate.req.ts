import { CollectionOf, Description, Enum, Maximum, Minimum, Nullable, Property, Required } from "@tsed/schema";
import { RuleTypeEnum } from "../..";

export class RuleInQnCreate {

    // @Property()
    // @Required(true, null)
    // @Nullable(String)
    // cqName: string | null;

    @Property()
    @Required()
    sqColName: string;


    @Property()
    @Required()
    @Description("client will display-name only")
    triggerOptionDisplayName: string;

};




export class SQDetailQn {

    @Property()
    @Required()
    @Description("sq/cq id")
    sqColName: string;


    @Property()
    @Required()
    @Minimum(0)
    @Maximum(1)
    weight: number;


    @Property()
    @Required()
    @Description("acts as sequence number , basically used to enforce ordering")
    @Minimum(1)
    order: number;


}


export class CQDetailQn {

    @Property()
    @Required()
    @Description("sq/cq id")
    cqName: string;


    @Property()
    @Required()
    @Minimum(0)
    @Maximum(1)
    weight: number;


    @Property()
    @Required()
    @Description("acts as sequence number , basically used to enforce ordering")
    @Minimum(1)
    order: number;


}


export class QuestionDetailsWithRule extends SQDetailQn {


    @Property()
    @Enum(RuleTypeEnum)
    ruleType: RuleTypeEnum;

    @Property()
    @CollectionOf(RuleInQnCreate)
    rules: RuleInQnCreate[];

}

export class QuestionDetailsWithOutOrder {

    @Property()
    @Required()
    @Description("sq/cq id")
    sqColName: string;


    @Property()
    @Required()
    @Minimum(0)
    @Maximum(1)
    weight: number;


}


export class PerOptionDetails {

    @Property()
    @Required()
    displayName: string;


    @Property()
    @Required()
    code: string;

    @Property()
    @Required()
    @CollectionOf(QuestionDetailsWithOutOrder)
    @Description("embedded simple questions or an empty array")
    optionDetails: QuestionDetailsWithOutOrder[];

}



export class QuestionDetailsForGroup {

    @Property()
    @Required()
    headerSQColName: string;


    @Property()
    @Required(true)
    @Minimum(1)
    @Description("acts as sequence number , basically used to enforce ordering")
    order: number;


    @Property()
    @Required()
    @Minimum(0)
    @Maximum(1)
    @Description("weight of this question group")
    weight: number;

    @Property()
    @Required()
    @CollectionOf(PerOptionDetails)
    perOptionDetails: PerOptionDetails[];

}



export class GroupDetails {

    @Property()
    @Required()
    groupSize: number;


    @Property()
    @Required()
    groupOrder: number;


    @Property()
    @CollectionOf(SQDetailQn)
    @Description("simple questions details")
    simpleQuestionDetails: SQDetailQn[];


    @Property()
    @CollectionOf(CQDetailQn)
    @Description("complex questions details")
    complexQuestionDetails: CQDetailQn[];


    @Property()
    @CollectionOf(QuestionDetailsWithRule)
    @Description("list of rule based SQs")
    ruleBasedSimpleQuestions: QuestionDetailsWithRule[]
}

export class QuizPageCreate {

    @Property()
    @Required()
    pageNo: number;


    @Property()
    @Required()
    categoryTag: string;


    @Property()
    imgDesktop: string;



    @Property()
    imgMobile: string;




    @Property()
    @Required()
    @CollectionOf(GroupDetails)
    groupDetails: GroupDetails[];
}

export class QuestionaireCreateDetails {


    @Property()
    @Required()
    @Description("Question Text for display")
    name: string;

    @Property()
    @Required()
    @Description("Question Text for display")
    description: string;


    @Property()
    @Required()
    @Description("Questionnaire created by - Admin User ID")
    createdBy: string;

    @Property()
    @CollectionOf(String)
    @Description("Array of tags")
    tags: string[];


    @Property()
    @Required()
    @Description("maximum allowed score")
    maxAllowedScore: number;



    @Property()
    @Required()
    @CollectionOf(QuizPageCreate)
    pages: QuizPageCreate[];


}


