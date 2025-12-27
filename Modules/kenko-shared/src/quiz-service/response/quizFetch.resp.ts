import { CollectionOf, Description, Enum, Nullable, Property, Required } from "@tsed/schema";
import { RuleTypeEnum } from "../../common/enums-and-constants/global.enum";
import { DOB } from "../../common/schema/customDate.schema";
import { MedicalExpenditureSelectedOptionClient, MedicalExpenditureOptionListClient, OptionBasics } from "../common/expenditure";
import { AnswerTypeEnum } from "../enums-and-constants/quiz.enum";
import { Validation } from "../request/validations.req";



export class Rule {

    @Property()
    @Required(true, null)
    @Nullable(String)
    complexQuestionId: string | null;

    @Property()
    @Required()
    simpleQuestionId: string;


    @Property()
    @Required()
    triggerOption: OptionBasics;

}




export class SimpleQuestionQz {

    @Property()
    @Required()
    simpleQuestionId: string;


    @Property()
    @Required(true, "")
    name: string;

    @Property()
    @Required(true, null)
    @Nullable(String)
    description: string | null;


    @Property()
    @Required()
    @CollectionOf(OptionBasics)
    @Description("set of possible answers/options")
    possibleOptions: OptionBasics[];

    @Property()
    @Required(true, null)
    expenditureOptionList: MedicalExpenditureOptionListClient;


    @Property()
    @Enum(AnswerTypeEnum)
    @Required()
    @Description("number / options / etc ...")
    answerType: AnswerTypeEnum;


    @Property()
    @Description("for NUMERIC , NUMERIC-RANGE , TEXT answer-type only ")
    @CollectionOf(Validation)
    validation: Validation[];



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
    @Description("order of questions")
    order: number;



    @Property()
    @CollectionOf(OptionBasics)
    @Description("store user's selected options")
    selectedOptions: OptionBasics[];


    @Property()
    @Description("store user's numeric answer")
    numericAnswer: number;

    @Property()
    @Description("store user's text answer")
    textAnswer: string;


    @Property()
    @Required(true, null)
    @Nullable(DOB)
    dateAnswer: DOB;


    @Property()
    @Description("store user's date answer")
    // @CollectionOf(Number)
    numericAnswerList: number[];

    @Property()
    @Required(true, null)
    @Description("store user's selected options")
    expenditureSelectedOptions: MedicalExpenditureSelectedOptionClient;


    @Property()
    numberOfInputs: number;



    @Property()
    @Description("store user's text answer")
    // @CollectionOf(String)
    placeHolderText: string[];



}



export class ComplexQuestionQz {

    @Property()
    @Required()
    complexQuestionId: string;


    @Property()
    @Required()
    name: string;

    @Property()
    @Required()
    description: string;


    @Property()
    @Required()
    @CollectionOf(SimpleQuestionQz)
    simpleQuestions: SimpleQuestionQz[];

    @Property()
    @Required()
    @Description("order of questions")
    order: number;


}



export class RuleBasedSimpleQuestionQz extends SimpleQuestionQz {



    @Property()
    @Enum(RuleTypeEnum)
    @Required()
    @Description("set of possible answers/options")
    ruleType: RuleTypeEnum;


    @Property()
    @Required()
    @CollectionOf(Rule)
    @Description("set of possible answers/options")
    rules: Rule[];

}



export class SimpleQuestionQzWithoutOrder {


    @Property()
    @Required()
    simpleQuestionId: string;


    @Property()
    @Required()
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


    @Property()
    @Required()
    @CollectionOf(OptionBasics)
    @Description("set of possible answers/options")
    possibleOptions: OptionBasics[];


    @Property()
    @CollectionOf(OptionBasics)
    @Description("store user's selected options")
    selectedOptions: OptionBasics[];


    @Property()
    @Description("store user's numeric answer")
    numericAnswer: number;

    @Property()
    @Description("store user's text answer")
    textAnswer: string;



    @Property()
    @Description("store user's date answer")
    dateAnswer: DOB;


    @Property()
    @Description("store user's date answer")
    // @CollectionOf(Number)
    numericAnswerList: number[];


    @Property()
    @Description("store user's selected options")
    expenditureSelectedOptions: MedicalExpenditureSelectedOptionClient;


    @Property()
    @Description("this is redundant")
    order: number;

}





