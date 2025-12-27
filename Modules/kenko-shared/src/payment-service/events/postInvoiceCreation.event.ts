import { PaymentEntityEnum, PaymentMediumEnum } from "../../payment-service";


export class PostInvoiceCreationEvent {
    currentPlanId: string;
    invoiceId: string;
    invoiceUrl: string;
}
