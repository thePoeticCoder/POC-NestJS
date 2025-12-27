

import { CollectionOf, Description, Enum, Minimum, Nullable, Property, Required } from "@tsed/schema";
import { AnswerTypeEnum } from "../enums-and-constants/quiz.enum";
import { Validation } from "../request/validations.req";



export class OptionBasics {

    @Property()
    @Required()
    displayName: string;

    @Property()
    @Required(true, null)
    displayDesc: string;

    @Property()
    @Required()
    code: string;

};



export class OptionDb extends OptionBasics {


    @Property()
    @Required()
    isRedFlagOption: boolean;


    @Property()
    @Required()
    @Description("user score when he is selecting this option")
    selectScore: number;

};


export class SQBasics {

    @Property()
    @Required(true, "")
    name: string;

    @Property()
    @Required(true, null)
    @Nullable(String)
    description: string | null;


    @Property()
    @Required(true, null)
    @Nullable(String)
    individual: string | null;

    @Property()
    @Required(true, null)
    @Nullable(String)
    nonIndividual: string | null;


    @Property()
    @Enum(AnswerTypeEnum)
    @Required()
    @Description("number / options / etc ...")
    answerType: AnswerTypeEnum;

    @Property()
    @Description("for NUMERIC , NUMERIC-RANGE , TEXT answer-type only ")
    @CollectionOf(Validation)
    validation: Validation[];

}



export class SQBasicsWithDBOptions extends SQBasics {

    @Property()
    @Required()
    @CollectionOf(OptionDb)
    @Description("set of possible answers/options")
    possibleOptions: OptionDb[];

}


export class SQSecretDetails extends SQBasicsWithDBOptions {


    @Property()
    @Required()
    @Description("used while making questionaire , all key will be this column name only")
    columnName: string;


    @Property()
    @Required()
    @Description("red flag questions")
    isRedFlag: boolean;



    @Property()
    @Required()
    @Minimum(0)
    @Description("max possible raw user score for this SQ")
    maxPossibleRawScore: number;


}





export class SimpleQuestionResp {


    @Property()
    _id: string;


    @Property()
    @Required()
    @Description("used while making questionaire , all key will be this column name only")
    columnName: string;


    @Property()
    @Required()
    @Description("red flag questions")
    isRedFlag: boolean;



    @Property()
    @Required()
    @Minimum(0)
    @Description("max possible raw user score for this SQ")
    maxPossibleRawScore: number;



    @Property()
    @Required()
    @CollectionOf(OptionDb)
    @Description("set of possible answers/options")
    possibleOptions: OptionDb[];




}