import { Property, Required } from '@tsed/schema';

export class MktPlaceOrderFeeback {
  @Property()
  @Required()
  orderId: string;

  @Property()
  @Required()
  postDeliveryIntervention: boolean;

  @Property()
  interventionReason: string;

  @Property()
  interventionReasonDescription: string;
}
