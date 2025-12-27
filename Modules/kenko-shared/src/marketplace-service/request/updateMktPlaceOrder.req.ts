import { Property, Example, Required } from "@tsed/schema";
import { CartItem } from "../models";

export class UpdateMktPlaceOrder {
  @Property()
  userId: string;

  @Property()
  orderItems: CartItem[]
}