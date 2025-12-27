


import { Description, Property, Required } from "@tsed/schema";

export class UserValidateReq {


  @Property()
  @Required()
  userId: string;


  @Property()
  @Required()
  @Description("if the calling service needs other details")
  metaInfoRequired: boolean;



};