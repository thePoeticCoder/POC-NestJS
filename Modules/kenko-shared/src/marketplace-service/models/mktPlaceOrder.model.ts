import {
  CollectionOf,
  Description,
  Minimum,
  MinLength,
  Property,
} from '@tsed/schema';
import { OrderStatusEnum } from '../../common';
import { Address } from '../../common/schema/address';
import { Medpay } from '../../medpay-service';
import { CartItem } from './cartItem.model';
import { ZohoInvoiceDetails } from './zohoDebitNode.model';

export class MktPlaceOrder {

  @Property()
  userId: string;

  @Property()
  @CollectionOf(CartItem)
  @MinLength(1)
  @Description('list of items')
  items: CartItem[];
  @Description('refernce to cart , just before order , to backtrack')
  metaOrderId: string;

  @Property()
  @Description(
    'cart can be broken to different partners , so each order has partner Name',
  )
  partnerName: string;

  @Property()
  @Description("partner's order Id")
  @Minimum(0)
  partnerOrderId: string;

  @Property()
  @Minimum(0)
  @Description("partner's order status, will be updated by webhooks")
  partnerOrderStatus: string;

  @Property()
  @Description('partner cancellation reason')
  partnerCancellationReason: string;

  @Property()
  @Description('this will be for UI client , open-closed')
  clientOrderStatus: OrderStatusEnum;

  @Property()
  @Description('partner cancellation reason')
  userCancellationReason: string;

  @Property()
  address: Address;

  @Property()
  @Description('pop-up for feedback shown or not')
  partnerOrderFeedback?: boolean;

  @Property()
  @Description('delivery issue encountered => yes/no')
  postDeliveryIntervention?: boolean;

  @Property()
  @Description('reason of delivery issue encountered')
  interventionReason?: string;

  @Property()
  @Description('Descriptive of delivery issue encountered')
  interventionReasonDescription?: string;

  @Property()
  medpayDetails?: Medpay;

  @Property()
  ticketId?: string;

  @Property()
  zohoInvoiceDetails?: ZohoInvoiceDetails;

  @Property()
  rejectionReason?: string;

  @Property()
  terminal?: boolean;

  @Property()
  orderPreviewAmount?: any;

  @Property()
  orderApprovalStatusUpdate?: Date;

  @Property()
  orderPaymentCompleteDate?: Date;

  @Property()
  orderDeliveredDate?: Date;

  @Property()
  userSelectedPlanId?: string;

  @Property()
  userSelectedPlanName?: string;

  @Property()
  userSelectedCouponId?: string;

  @Property()
  couponCode?: string;

  @Property()
  couponDescription?: string;
}
