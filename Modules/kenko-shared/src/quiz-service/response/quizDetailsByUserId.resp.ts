import { Property, Required } from "@tsed/schema";
import { GenderEnum } from "../../common";
import { QuizStateEnum } from "../enums-and-constants/quiz.enum";



export class QuizDetailsByUserId {

    @Property()
    @Required()
    userId: string;


    @Property()
    @Required()
    quizStatus: QuizStateEnum;


    @Property()
    @Required()
    quizScore: number;

    @Property()
    @Required()
    age: number;

    @Property()
    @Required()
    hasDiabetes: boolean;


    @Property()
    @Required()
    selectedIndividualOption: boolean;


    @Property()
    @Required()
    gender: GenderEnum;


}



