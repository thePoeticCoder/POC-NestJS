import { Generics, Property } from '@tsed/schema';
import { EventActions } from '../enums-and-constants/global.enum';



export interface UserDetails {
  userId?: string;
  crmId?: string;
  emailId?: string;
  zohoCustomerId?: string;
}

@Generics('T')
export class QueueEventNew<T> {

  @Property()
  eventName: string;

  @Property()
  logId: string;

  @Property()
  action: EventActions;

  @Property()
  source: string;

  @Property()
  eventData: T;

  @Property()
  key: string;


  @Property()
  objectType?: string;

  @Property()
  destination?: string;

  @Property()
  userDetails?: UserDetails;

  constructor(
    logId: string,
    eventName: string,
    action: EventActions,
    source: string,
    eventData: T,
    destination?: string,
    userDetails?: UserDetails,
    objectType?: string,
  ) {
    this.eventName = eventName;
    this.logId = logId;
    this.action = action;
    this.source = source;
    this.eventData = eventData;
    this.destination = (destination && destination.length > 0) ? destination : null as any;
    this.userDetails = userDetails ? userDetails : (null as any);
    this.objectType = (objectType && objectType.length > 0) ? objectType : null as any;

    if (this.destination && this.destination.length > 0) {
      this.key = `${this.source}.${this.destination}`;
    } else {
      this.key = `${this.source}`;
    }
  }
}



