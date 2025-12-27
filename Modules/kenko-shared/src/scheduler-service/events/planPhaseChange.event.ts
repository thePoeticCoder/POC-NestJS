import { PaymentEntityEnum, PaymentMediumEnum } from "../../payment-service/enums-and-constants/payment.enum";
import { SchedulerServiceCommon } from "../../user-service";
import { PlanPhaseEnum } from "../enums-and-constants/scheduler.enum";

export class SchedulerServiceGenericEvent extends SchedulerServiceCommon {
    planCurrentPhase: PlanPhaseEnum;
    epoch?: string;
    planExpiryDate: string; //dd/mm/yyyy
    paymentMedium: PaymentMediumEnum;

    daysFromExpiry: number;
    notificationIdx: number; //if we need to send n notification per day , this denotes [1,2,3..,n]
}



export class SchedulerServicePlanCreateRequest {
    userId: string;

    //old-plan details
    oldPlanName: string;
    oldPlanId: string;

    //new-plan details
    newPlanCurrentPhase: PlanPhaseEnum;
    newPlanExpiryDate: string; //dd/mm/yyyy
    newPlanName: string;
    newPlanDurationMonths: number;

    epoch?: string;
    invoiceDate?: string;
    paymentMedium: PaymentMediumEnum;
}
