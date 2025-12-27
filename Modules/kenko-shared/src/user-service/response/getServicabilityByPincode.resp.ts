


import { Property, Required } from "@tsed/schema";

export class GetServicabilityByPincodeResp {


  @Property()
  @Required()
  pincode: number;


  @Property()
  @Required()
  isServicable: boolean;


  @Property()
  @Required()
  partner: string;



  @Property()
  @Required()
  slots: string[];


};