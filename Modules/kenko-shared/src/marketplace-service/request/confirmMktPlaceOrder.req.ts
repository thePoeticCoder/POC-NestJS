import { Description, Property, Required } from '@tsed/schema';
import { CartItem } from '../models';

export class ConfirmMktPlaceOrder {
  @Property()
  @Required()
  userId: string;

  @Property()
  @Required()
  @Description('Meta Order id')
  metaOrderId: string;

  @Property()
  @Required()
  @Description('Confirmed Items')
  orderItems: CartItem[];

  @Property()
  @Description('coupon id')
  userSelectedCouponId: string;
}
