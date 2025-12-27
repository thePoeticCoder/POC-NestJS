import { ElsProduct } from './elsProduct.model';
import { Property, Description } from '@tsed/schema';

export class CartItem extends ElsProduct {
  @Property()
  @Description('quantity of a product/item in cart')
  qty: number;
}
