import { Property, Required } from "@tsed/schema";

export class ContactPerson {

    @Property()
    @Required()
    first_name : string;

    @Property()
    @Required()
    last_name : string;

    @Property()
    @Required()
    email : string;

    @Property()
    @Required()
    mobile : string;

    @Property()
    @Required()
    is_primary_contact: boolean

    @Property()
    @Required()
    is_sms_enabled_for_cp: boolean

}