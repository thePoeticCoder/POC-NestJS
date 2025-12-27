import { Property } from '@tsed/schema';

export class OrderApproval {
  @Property()
  orderId: string;
  @Property()
  ticketId: string;
  @Property()
  secondApproval: string;
  @Property()
  reasonCode: string;
  @Property()
  cancellationType: string;
}
