

export class RenewalLinkReadyEvent {
    userId: string;
    planId?: string;
    planName: string;
    planDurationMonths: number;
    paymentLink: string;

    //new fields
    planPrice: number;
    finalInvoiceAmount: number;
    planExpiryDate: string;
    discountPercent: number;
    discountAmount: number;



}
