import { Property, Required, Enum } from "@tsed/schema";
import { VersionSourceEnum } from "../../common/enums-and-constants/global.enum";
import { QuizToFill } from "../response/quizToFill.resp";

export class QuizSubmitReq extends QuizToFill {


    @Property()
    @Required()
    userId: string;


    @Property()
    @Enum(VersionSourceEnum)
    versionSource?: VersionSourceEnum;


    @Property()
    utm_campaign?: string;

}