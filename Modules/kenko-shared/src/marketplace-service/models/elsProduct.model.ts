import { Property, Required, Description, Enum } from '@tsed/schema';
import { AvailabilityTypeEnum } from '../enums-and-constants';

export class ModifiedItems {
  @Property()
  @Required()
  id: number;

  @Property()
  partnerName: string;

  @Property()
  qty: number;

  @Property()
  itemName: string;

  @Property()
  skuId: string;

  @Property()
  issuance: string;

  @Property()
  description: string;

  @Property()
  category: string;

  @Property()
  isActive: boolean;

  @Property()
  mrp: number;

  @Property()
  stock: number;

  @Property()
  imageUrl: string;
}

export class ElsProduct {
  @Property()
  @Required()
  id: number;

  @Property()
  partnerName: string;

  @Property()
  itemName: string;

  @Property()
  skuId: string;

  @Property()
  issuance: string;

  @Property()
  description: string;

  @Property()
  category: string;

  @Property()
  isActive: boolean;

  @Property()
  mrp: number;

  @Property()
  stock: number;

  @Property()
  imageUrl: string;

  @Property()
  @Enum()
  availabilityType: AvailabilityTypeEnum;

  @Property()
  @Description('Type of change')
  changeType: string;

  @Property()
  @Description('Modified Items once order is modified')
  modifiedItems: ModifiedItems;

  @Property()
  isInCart?: boolean;

  @Property()
  cartQuantity?: number;

  @Property()
  isInFavorites?: boolean;
  @Property()
  @Description('Pack quantity')
  packQty: number;

  @Property()
  @Description('Display name for pack quantity')
  packQtyLabel: string;

  @Property()
  @Description('Drug form')
  drugForm: string;

  @Property()
  @Description('Maximum allowed quantity for this item')
  maxQuantity: number;
}
