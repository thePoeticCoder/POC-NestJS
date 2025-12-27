import { Property, Required, Example } from '@tsed/schema';
import { Address } from '../../common/schema/address';

export class PlaceMktPlaceOrder {
  @Property()
  @Required()
  @Example('61235f34cf4dd20024ffab82')
  userId: string;

  // Will depricate when addresses have their own document ids
  @Property()
  @Required()
  address: Address;

  @Property()
  addressId: string;

  @Property()
  @Required()
  @Example('6205ec8a143d43002467da42')
  userSelectedPlanId: string;

  @Property()
  userSelectedCouponId: string;

  @Property()
  @Required()
  userSelectedPlanName: string;
}
