import { Description, Property } from '@tsed/schema';

export class OrderHistorySummary {
  @Property()
  @Description('Order History duration in days')
  duration: number;

  @Property()
  @Description('Number of orders in the duration')
  numberOfOrders: number;

  @Property()
  @Description('Total number of items of all orders combined in the duration')
  numberOfItems: number;

  @Property()
  @Description('Kenko Benefit total in the duration')
  kenkoBenefit: number;

  @Property()
  @Description(
    'Total sum spent by the customer of all orders combined in the duration',
  )
  totalAmount: number;

  @Property()
  @Description('Count of active orders excluding the current one')
  activeOrders: number;

  @Property()
  @Description('Order history for the duration')
  orderHistory: OrderHistory[];
}

export class OrderHistory {
  @Property()
  @Description('Hubspot ticketId')
  ticketId: string;

  @Property()
  @Description('backend orderId')
  orderId: string;

  @Property()
  @Description('Order Status')
  orderStatus: string;

  @Property()
  @Description('Order creation date')
  createdAt: Date;

  @Property()
  @Description('Order closing date')
  closedAt?: Date;

  @Property()
  @Description('Total number of items across all orders')
  numberOfProducts: number;

  @Property()
  @Description('Total benifit amount given by kenko')
  benifitAmount: number;

  @Property()
  @Description('Total amount spent by the customer')
  totalAmount: number;

  @Property()
  @Description('Orders Summary')
  products: ProductHistory[];
}

export class ProductHistory {
  @Property()
  @Description('quantity')
  quantity: number;

  @Property()
  @Description('product price')
  price: number;

  @Property()
  @Description('product skiud')
  skuid: string;

  @Property()
  @Description('product name')
  name: string;
}
