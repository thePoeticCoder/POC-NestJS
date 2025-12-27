import { Property, Required } from "@tsed/schema";
import { QuizToFill } from "./quizToFill.resp";

export class QuizSaveResp extends QuizToFill {

    @Property()
    @Required()
    userId: string;
}