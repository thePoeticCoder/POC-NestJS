import { PaymentEntityEnum, PaymentMediumEnum } from "../../payment-service";


export class SchedulerServiceCommon {
    userId: string;
    currentPlanId: string;
    currentPlanName: string;
    currentPlanDurationMonths: number;
    deleteAllOldPlan: boolean;
    deletePlanIds: string[];
    invoiceDate?: string;
    paymentDate?: string;
    paymentLink?: string;
}
export class RenewalDoneWithSamePlanEvent extends SchedulerServiceCommon {
    paymentEntity: PaymentEntityEnum;
    paymentMedium: PaymentMediumEnum;
}


export class RenewalDoneWithDifferentPlanEvent extends SchedulerServiceCommon {
    paymentEntity: PaymentEntityEnum;
    paymentMedium: PaymentMediumEnum;

    oldPlanName: string;
    oldPlanId: string;
    oldPlanExpiry: string;
}



export class PlanDueDateUpdateEvent extends SchedulerServiceCommon {
    currentPlanExpiryDate: string; //dd-mm-yyyy 
    isCurrentPlanToBeRemovedByZap: boolean;
    paymentMedium: PaymentMediumEnum;
}



export class UserServicePostNewPlanCreateEvent {
    userId: string;

    //new plan details
    newPlanId: string;
    newPlanName: string;
    newPlanDurationMonths: number;
    newPlanExpiryDate: string; //dd/mm/yyyy

    deleteAllOldPlan: boolean;
    deletePlanIds: string[];
    invoiceDate?: string;
    paymentDate?: string;
    paymentLink?: string;
    paymentMedium: PaymentMediumEnum;
}
