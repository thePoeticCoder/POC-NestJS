import { Property, Description, Name } from '@tsed/schema';
import { CartItem } from './cartItem.model';

export class Cart {
  
  @Property()
  userId: string;

  @Property()
  ticketId?: string;

  @Property()
  @Description('list of items')
  items: CartItem[];
}
