import { PlanPhaseEnum } from '@kenko-health/shared';
import { Inject, Injectable } from '@nestjs/common';
// import { JobNamesEnum } from '../enums-and-constants/enums';
// import { PlanPhaseDetailsDao } from '../dao/planPhaseDetails.dao';
// import { AgendaJob, AgendaJobDB } from '../models/agendaJob.model';

import { CommonService } from './common.service';

@Injectable()
export class ConverterService {


    @Inject()
    private commonService: CommonService;

    // @Inject()
    // private planPhaseDetailsDao: PlanPhaseDetailsDao;


    private getNextPhase(currentPhase: PlanPhaseEnum): PlanPhaseEnum {
        switch (currentPhase) {
            case PlanPhaseEnum.NORMAL:
                return PlanPhaseEnum.RENEWAL;

            case PlanPhaseEnum.RENEWAL:
                return PlanPhaseEnum.GRACE;

            case PlanPhaseEnum.GRACE:
                return PlanPhaseEnum.POST_GRACE;

            case PlanPhaseEnum.POST_GRACE:
                return PlanPhaseEnum.EXPIRY;

            default:
                return null;
        }

    }


    // async getNextPhaseJob(job: AgendaJob, nextPhase: PlanPhaseEnum, nextRunDate?: Date): Promise<AgendaJob> {
    //     const { userId, planId, planExpiryDate, durationMonths, planName, emailId, logId, crmId } = job.data;
    //     const planPhaseDetails = await this.planPhaseDetailsDao.getPhaseDetails(nextPhase);
    //     const nextJobDate = nextRunDate || this.commonService.getNextPhaseDateFromExpiryDate(nextPhase, planPhaseDetails, planExpiryDate);

    //     const nextJob: AgendaJob = {
    //         data: {
    //             userId,
    //             planId,
    //             planCurrentPhase: nextPhase,
    //             planExpiryDate,
    //             durationMonths,
    //             logId,
    //             crmId,
    //             emailId,
    //             planName
    //         },
    //         name: JobNamesEnum.PLAN_PHASE_TRANSITION,
    //         nextRunAt: nextJobDate

    //     }
    //     return nextJob;
    // }






    // async getNotificationJob(job: AgendaJobDB, nextPhase: PlanPhaseEnum, nextRunDate?: Date): Promise<AgendaJob> {
    //     const { userId, planId, planExpiryDate, durationMonths, logId, crmId, emailId, planName } = job.data;
    //     const planPhaseDetails = await this.planPhaseDetailsDao.getPhaseDetails(nextPhase);
    //     const notifJobEndDate = this.commonService.getNextPhaseDateFromExpiryDate(nextPhase, planPhaseDetails, planExpiryDate);
    //     const notifJobStartDate = nextRunDate || this.commonService.getNotifJobStartDateFromExpiryDate(nextPhase, planPhaseDetails, planExpiryDate);
    //     const cronExpressionByPhase = this.commonService.getNotifCronExpressionByPhase(nextPhase, planPhaseDetails);

    //     const notificationJob: AgendaJob = {
    //         data: {
    //             planCurrentPhase: nextPhase,
    //             planExpiryDate,
    //             planId,
    //             userId,
    //             durationMonths,
    //             logId,
    //             crmId,
    //             emailId,
    //             planName
    //         },
    //         name: JobNamesEnum.RENEWAL_NOTIFICATION,
    //         endDate: notifJobEndDate,
    //         nextRunAt: notifJobStartDate,
    //         repeatInterval: cronExpressionByPhase
    //     };

    //     return notificationJob;
    // }





}