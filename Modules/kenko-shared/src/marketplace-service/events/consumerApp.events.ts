import { Cart } from "../models";
import { MetaOrder } from "../models/metaOrder.model";
import { MktPlaceOrder } from "../models/mktPlaceOrder.model";

export class ConsumerAppMarketplaceEvent {
  metaOrder?: MetaOrder;
  marketplaceOrder?: MktPlaceOrder;
  // TODO: update when we move all user models to shared
  userDetails?: any;
  cart?: Cart
}