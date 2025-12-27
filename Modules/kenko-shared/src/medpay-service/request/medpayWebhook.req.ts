import { Description, Property, Required } from '@tsed/schema';
import { MedpayInvoiceDetails } from '../response';
import { OrderModifiedResponse } from '../response/orderModified.res';
import { PaymentDetailsResponse } from '../response/paymentDetails.res';
import { BookingDetailsRequest } from './bookingDetails.req';

export class MedpayWebhook {
  @Property()
  @Required()
  @Description('Partner Order Id')
  partner_order_id: string;

  @Property()
  @Required()
  @Description('Partner name')
  partner_name: string;

  @Property()
  @Required()
  @Description('Order Status')
  order_status: string;

  @Property()
  @Description('Invoice details')
  invoice_details: MedpayInvoiceDetails;

  @Property()
  @Description('Payment details')
  payment_details: PaymentDetailsResponse;

  @Property()
  @Description('Order details')
  order_details: OrderModifiedResponse;

  @Property()
  @Description('Booking details')
  booking_details: BookingDetailsRequest;

  @Property()
  @Description('Reequested Booking details')
  requested_booking_details: BookingDetailsRequest;

  @Property()
  @Description('Order cancellation reason')
  cancelled_reason: string;

  @Property()
  @Description('Order cancelled by')
  cancelled_by: string;

  @Property()
  @Description('Timestamp of webhook hit')
  timestamp: string;
}
