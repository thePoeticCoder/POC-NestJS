import { Description, MinLength, Name, Property, Required } from '@tsed/schema';
import { CartItem } from './cartItem.model';
import { Coupon } from './coupon.model';
import { OrderHistorySummary } from './orderHistorySummary.model';

export class MetaOrder{

  _id: string;

  @Required()
  @Property()
  userId: string;

  @Property()
  ticketId?: string;

  @Property()
  userSelectedPlanId: string;

  @Property()
  userSelectedPlanName: string;

  @Property()
  userSelectedCouponId: string;

  @Property()
  @MinLength(1)
  @Description("list of items")
  @Required()
  items: CartItem[];

  @Property()
  @Description("Order Histpry summary")
  orderHistorySummary?: OrderHistorySummary;

  coupon?: Coupon;
  createdAt?: Date;
}
