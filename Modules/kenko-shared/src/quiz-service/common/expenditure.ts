import { Property, Required, CollectionOf, Description } from '@tsed/schema';

export class OptionBasics {
  @Property()
  @Required()
  displayName: string;

  @Property()
  @Required(true, null)
  displayDesc: string;

  @Property()
  @Required()
  code: string;
}
export class MedicalExpenditureOptionListClient {
  @Property()
  @Required()
  @CollectionOf(OptionBasics)
  @Description('set of possible answers/options')
  medicine: OptionBasics[];

  @Property()
  @Required()
  @CollectionOf(OptionBasics)
  @Description('set of possible answers/options')
  diagnostic: OptionBasics[];

  @Property()
  @Required()
  @CollectionOf(OptionBasics)
  @Description('set of possible answers/options')
  doctorConsult: OptionBasics[];
}

export class MedicalExpenditureSelectedOptionClient {
  @Property()
  @Required()
  @Description('set of possible answers/options')
  medicine: OptionBasics;

  @Property()
  @Required()
  @Description('set of possible answers/options')
  diagnostic: OptionBasics;

  @Property()
  @Required()
  @Description('set of possible answers/options')
  doctorConsult: OptionBasics;
}
