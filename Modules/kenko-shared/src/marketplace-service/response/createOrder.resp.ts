import { Property } from '@tsed/schema';

export class CreateOrderResponse {
  @Property()
  orderId: string;

  @Property()
  message: string;
}
