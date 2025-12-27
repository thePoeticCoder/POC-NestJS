
import { Property, Required } from "@tsed/schema";
import { QuizToFill } from "./quizToFill.resp";



//to-do : implement this
export class QuizSubmitResp extends QuizToFill {

    @Property()
    @Required()
    userId: string;

}
