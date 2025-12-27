import { MaxLength, MinLength, Optional, Property, Required } from '@tsed/schema';
import { OrderIssues } from '../enums-and-constants';

export class ReportOrder {
  @Property()
  @Required()
  metaOrderId: string;

  @Property()
  ticketId?: string;

  @Property()
  @Required()
  issueItems: IssueItem[];
}

export class IssueItem {
  @Property()
  @Required()
  itemName: string;

  @Property()
  @Required()
  itemSKUid: string;

  @Property()
  @Required()
  partnerName: string;

  @Property()
  @Required()
  issueType: OrderIssues;

  @Property()
  @Required()
  @MaxLength(3)
  @MinLength(1)
  images: string[];

  @Property()
  @Optional()
  issueDescription?: string;
}
