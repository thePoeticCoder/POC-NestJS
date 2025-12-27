import {
  Description,
  Property,
  Required,
  Example
} from '@tsed/schema';

export class UpdateCart {
  @Property()
  @Required()
  @Description('Internal Product ID')
  @Example(11)
  id: number;

  @Property()
  @Required()
  @Description('New quantity of the product, can also be used to update the existing quantity. 0 means delete')
  @Example(10)
  qty: number;
}
