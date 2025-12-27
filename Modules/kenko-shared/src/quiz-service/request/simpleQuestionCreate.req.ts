
import { CollectionOf, Description, Enum, MaxLength, MinLength, Nullable, Property, Required } from "@tsed/schema";
import { AnswerTypeEnum } from "../enums-and-constants/quiz.enum";
import { Validation } from "./validations.req";

export class SQOption {

    @Property()
    @Required()
    displayName: string;


    @Property()
    @Required()
    @Nullable(String)
    displayDesc: string;


    @Property()
    @Required()
    isRedFlagOption: boolean;


    @Property()
    @Required()
    @Description("user score when he is selecting this option")
    selectScore: number;


}

export class SimpleQuestionCreateReq {


    @Property()
    @Required()
    @MinLength(0)
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
    @Required()
    @Description("used while making questionaire , all key will be this column name only")
    @MinLength(3)
    @MaxLength(30)
    columnName: string;


    @Property()
    @Enum(AnswerTypeEnum)
    @Required()
    @Description("number / options / etc ...")
    answerType: AnswerTypeEnum;


    @Property()
    @Required()
    @Description("red flag questions")
    isRedFlag: boolean;


    @Property()
    @Description("for NUMERIC , NUMERIC-RANGE , TEXT answer-type only ")
    @CollectionOf(Validation)
    validation: Validation[];

    @Property()
    @Required()
    @CollectionOf(SQOption)
    @Description("set of possible answers/options")
    possibleOptions: SQOption[];



    @Property()
    @Required()
    numberOfInputs: number;
    

    @Property()
    @Description("for NUMERIC , NUMERIC-RANGE , TEXT answer-type only ")
    @CollectionOf(String)
    placeHolderText: string[];

}