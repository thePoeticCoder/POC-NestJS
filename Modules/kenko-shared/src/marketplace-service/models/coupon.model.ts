import {
  CollectionOf,
  Default,
  Description,
  Enum,
  Example,
  Property,
  Required,
} from '@tsed/schema';
import { CouponTypeEnum } from '../enums-and-constants';

export class Coupon {
  @Property()
  @Required()
  @Example('KENKO500')
  @Description('Coupon code')
  couponCode: string;

  @Property()
  @Required()
  @CollectionOf(String)
  @Description('List of marketing messages for the coupon')
  @Example('Flat 500 Rupees off on all orders')
  couponDesc: string;

  @Property()
  @Required()
  @Description('Is the coupon active')
  isActive: boolean;

  @Property()
  @Required()
  @Description('Coupon display order, will be sorted in descending order')
  @Example(10)
  couponPriority: number;

  @Property()
  @Required()
  @Enum(CouponTypeEnum)
  @Description('Coupon type, percentage based discounts or flat amount')
  couponType: CouponTypeEnum;

  @Property()
  @Required()
  @Description('Coupon discount value')
  couponDiscountPercentageOrAmount: number;

  @Property()
  @Required()
  @Description('Maximum discount for this coupon, if coupon type is percentage')
  @Example(500)
  maxDiscountAmount: number;

  @Property()
  @Required()
  @Description('Minimum cart eligibility for this coupon')
  minCartAmount: number;

  @Property()
  @Default(false)
  @Description(
    "to lock the coupon when it was already used. so, that same coupon can't be used for multiple orders",
  )
  isLocked: boolean;
}
