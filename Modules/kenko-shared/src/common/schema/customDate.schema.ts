import { Description, Maximum, Minimum, Property, Required } from "@tsed/schema";


export class DayAndMonth {

  @Property()
  @Required()
  @Description("day of the month")
  @Minimum(1)
  @Maximum(31)
  dd: number;

  @Property()
  @Required()
  @Description("month")
  @Minimum(1)
  @Maximum(12)
  mm: number;
};



export class DOB extends DayAndMonth {

  @Property()
  @Required()
  @Minimum(1940)
  @Maximum(2015)
  @Description("year , for DOB we have restricted year")
  yyyy: number;
};



export class GenericDate extends DayAndMonth {

  @Property()
  @Required()
  @Minimum(1940)
  @Maximum(2199)
  @Description("year")
  yyyy: number;
};


export class GenericTime extends GenericDate {

  @Property()
  @Required()
  @Description("Hour")
  @Minimum(0)
  @Maximum(23)
  HH: number;

  @Property()
  @Required()
  @Description("minute")
  @Minimum(0)
  @Maximum(59)
  MM: number;
};