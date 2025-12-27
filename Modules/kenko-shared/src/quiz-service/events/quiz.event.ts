import { GenderEnum } from "../../common/enums-and-constants/global.enum";
import { DOB } from "../../common/schema/customDate.schema";
import { QuizToFill } from "../response/quizToFill.resp";

export class QuizDataEvent {

    //2 feild for CRM 
    quiz: QuizToFill;
    utm_campaign?: string;
    eligiblePlans?: string[];
    city: string;
    isFHC: boolean;



    //only for user service
    userScore: number;
    age: number;
    dob: DOB;
    gender: GenderEnum;
    pincode: number;


    medicineExpenditure: number;
    doctorConsultExpenditure: number;
    diagnosticExpenditure: number;
    totalExpenditure: number;

}
