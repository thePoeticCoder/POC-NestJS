import { Description, Property, Required, Example } from '@tsed/schema';

export class CancelMktPlaceOrder {
  @Property()
  @Required()
  @Example('61235f34cf4dd20024ffab82')
  userId: string;

  @Property()
  @Required()
  @Description('Meta Order ID')
  metaOrderId: string;

  @Property()
  @Required()
  @Description('Reason for cancelling the order')
  cancelledReason: string;
}
