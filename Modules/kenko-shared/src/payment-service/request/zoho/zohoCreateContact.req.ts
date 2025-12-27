
import { CollectionOf, Property, Required } from '@tsed/schema';
import { ContactPerson } from '../../schema/zohoContactPerson.schema';

export class ZohoCreateContact {

    @Property()
    @Required()
    contact_name: string;
    
    @Property()
    @Required()
    company_name?: string;

    @Property()
    @Required()
    phone: string;

    @Property()
    @Required()
    place_of_contact: string;

    @Property()
    @Required()
    contact_type: string;

    @Property()
    @Required()
    customer_sub_type : string;

    @Property()
    @Required()
    is_taxable: boolean;

    @Property()
    @Required()
    contact_category: string;

    @Property()
    @Required()
    gst_treatment : string;

    @Property()
    @Required()
    sales_channel : string;
    
    @Property()
    @CollectionOf(ContactPerson)
    @Required()
    contact_persons: ContactPerson[];
}
