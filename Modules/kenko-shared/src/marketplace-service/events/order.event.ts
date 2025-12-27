import { Address } from '../../common/schema/address';
import { MetaOrder, MktPlaceOrder } from '../models';

export class Order {
  metaOrder?: MetaOrder;
  marketplaceOrder?: MktPlaceOrder;
  address?: Address;
}
