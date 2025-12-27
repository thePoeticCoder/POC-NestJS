

import { Description, Property, Required } from "@tsed/schema";

export class FlushKenkoScore {



    @Property()
    @Required()
    @Description("hubspot's unique ID for this person")
    hsContactId: string;



    @Property()
    @Required()
    @Description("it will be : yes/no")
    flushKenkoScore: string;



    @Property()
    @Description("it will be : yes/no")
    emailId: string;






};