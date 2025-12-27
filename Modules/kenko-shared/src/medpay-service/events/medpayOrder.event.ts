import { MetaOrder } from '../../marketplace-service';
import { Medpay, MedpayError } from '../response';

export class MedpayOrder {
  response: Medpay;
  error?: MedpayError;
  metaOrder?: MetaOrder;
}
