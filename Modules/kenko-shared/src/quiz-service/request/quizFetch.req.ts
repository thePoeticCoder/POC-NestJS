


import { Description, Property, Required, Enum } from "@tsed/schema";
import { VersionSourceEnum } from "../../common/enums-and-constants/global.enum";

export class QuizFetchReq {


  @Property()
  @Required()
  @Description("questionaire id")
  qnId: string;


  @Property()
  @Required()
  @Description("user id")
  userId: string;


  @Property()
  @Description("baseplan id")
  basePlanId: string;



  @Property()
  utm_campaign?: string;


  @Property()
  @Enum(VersionSourceEnum)
  versionSource?: VersionSourceEnum;



};