import { MarketPlaceServiceQueueEventEnum } from '../enums-and-constants';
import { MetaOrder } from './metaOrder.model';
import { MktPlaceOrder } from './mktPlaceOrder.model';

export interface MarketPlaceServiceQueueEvent {
  logId: string;
  uuid: string;
  epoch: number;
  eventName: MarketPlaceServiceQueueEventEnum;

  userId?: string;
  addressId?: string;
  orderDetails?: MetaOrder;

  mktOrder?: MktPlaceOrder;
  mktOrderId?: string;
  notificationType?: string;

  medpayResponse?: any;
  medpayError?: any;
  playerId?: string;
  // backwards compatibility with push notification
  userDetails?: {
    userId?: string;
  };
}
