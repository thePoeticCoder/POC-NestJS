import { CollectionOf, Description, Property } from "@tsed/schema";
import { Item } from "./medpay.res";



export class OrderModifiedResponse {

  @Property()
  @Description("doctor")
  doctor: string;

  @CollectionOf(String)
  @Property()
  @Description("Valid prescription URL")
  prescription_link: string[] | string;

  @CollectionOf(Item)
  @Property()
  @Description("Line item details")
  items: Item[];

}