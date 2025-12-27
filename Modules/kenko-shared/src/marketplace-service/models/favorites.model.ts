import {
  CollectionOf,
  Description,
  MinLength,
  Name,
  Property,
  Required,
} from '@tsed/schema';
import { ElsProduct } from './elsProduct.model';

export class Favorites {
  @Property()
  @Required()
  userId: string;

  @Property()
  @CollectionOf(ElsProduct)
  @MinLength(1)
  @Description('list of items')
  @Required()
  items: ElsProduct[];
}
