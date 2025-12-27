import { PaymentEntityEnum, PaymentMediumEnum } from "../../payment-service";


export class PostPaymentEvent {
    userId: string;
    paymentEntity: PaymentEntityEnum;
    planId?: string;
    planName: string;
    planDurationMonths: number;
    paymentLink: string;

    //dates(dd/mm/yyyy)
    invoiceDate: string;
    paymentDate: string;
    paymentMedium: PaymentMediumEnum;
}
