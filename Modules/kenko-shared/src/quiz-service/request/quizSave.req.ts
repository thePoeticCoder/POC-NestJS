import { Property, Required, Enum } from "@tsed/schema";
import { VersionSourceEnum } from "../../common/enums-and-constants/global.enum";
import { QuizToFill } from "../response/quizToFill.resp";

export class QuizSaveReq extends QuizToFill {

    @Property()
    @Required()
    userId: string;


    @Property()
    @Required()
    savedTillPageNo: number;


    @Property()
    savedTillGroupNo?: number;


    @Property()
    @Enum(VersionSourceEnum)
    versionSource?: VersionSourceEnum;



}

