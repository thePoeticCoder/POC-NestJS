// import { PlanDueDateUpdateEvent, PlanPhaseEnum, QueueEventNew, RenewalDoneEvent } from '@kenko-health/shared';
// import { Inject, Injectable } from '@nestjs/common';
// // import * as moment from 'moment';
// // import { QueueProducerService } from '../../queue/services/queueProducer.service';
// // import { AgendaJobDao } from '../dao/agendaJob.dao';
// // import { PlanPhaseDetailsDao } from '../dao/planPhaseDetails.dao';
// // import { JobNamesEnum } from '../enums-and-constants/enums';
// // import { AgendaJob, AgendaJobDB } from '../models/agendaJob.model';
// // import { PlanPhaseDetails, PlanPhaseDetailsDB } from '../models/planPhaseDetails.model';
// import { CommonService } from './common.service';
// import { ConverterService } from './converter.service';
// import { ErrorHandlerService } from './errorHandler.service';
// import { LogService } from './log.service';

// @Injectable()
// export class InternalService {

//     // @Inject()
//     // private planPhaseDetailsDao: PlanPhaseDetailsDao;

//     @Inject()
//     private commonService: CommonService;

//     @Inject()
//     private logService: LogService;

//     // @Inject()
//     // private agendaJobDao: AgendaJobDao;

//     @Inject()
//     private errorHandlerService: ErrorHandlerService;

//     @Inject()
//     private converterService: ConverterService;

//     // @Inject()
//     // private queueProducerService: QueueProducerService;

//     // async createPlanDetails(request: PlanPhaseDetails) {
//     //     return await this.planPhaseDetailsDao.create(request);
//     // }

//     // async getAllPlanPhases() {
//     //     return await this.planPhaseDetailsDao.getAllPhaseDetails();
//     // }

//     // async handleSubscriberNew(parsedData: QueueEventNew<PlanDueDateUpdateEvent>) {
//     //     const { logId, eventData } = parsedData;
//     //     try {
//     //         this.logService.info(logId, `inside handleSubscriberNew , now calling createInitialSchedule`);
//     //         this.logService.printObject(logId, eventData);
//     //         await this.createInitialSchedule(parsedData);
//     //         this.logService.info(logId, `successfully executed handleSubscriberNew ...`)
//     //     } catch (e) {
//     //         this.errorHandlerService.handleError(e, logId, { methodName: "handleSubscriberNew", sendErrorNotification: true });
//     //     }
//     // }

//     // async handleDateUpdate(parsedData: QueueEventNew<PlanDueDateUpdateEvent>) {
//     //     try {
//     //         const { logId, eventData, userDetails } = parsedData;
//     //         const { crmId, emailId } = userDetails;
//     //         const { userId, currentPlanId, currentPlanDurationMonths, currentPlanExpiryDate, currentPlanName, deleteAllOldPlan, deletePlanIds } = eventData;
//     //         this.logService.info(logId, `inside handleDateUpdate`);
//     //         this.logService.printObject(logId, eventData);
//     //         this.logService.printObject(logId, userDetails);

//     //         if (deleteAllOldPlan) {
//     //             await this.agendaJobDao.disableAllJobsByUserId(userId);
//     //             this.logService.info(logId, `Disabled all jobs`);
//     //         } else if (deletePlanIds && deletePlanIds.length > 0) {

//     //         }

//     //         const { phaseAfterDateUpdate, nextNotifJobDate } = await this.findCurrentPhaseAfterDateUpdate(parsedData);
//     //         this.logService.info(logId, `phaseAfterDateUpdate=[${phaseAfterDateUpdate}] , nextNotifJobDate=[${nextNotifJobDate}]`)

//     //         //if date updated in normal phase itself
//     //         if (phaseAfterDateUpdate === PlanPhaseEnum.NORMAL) {
//     //             const jobCreated = await this.createInitialSchedule(parsedData);
//     //             // await this.queueProducerService.sendPlanTransitionEvent(jobCreated, PlanPhaseEnum.NORMAL);
//     //             return;
//     //         }

//     //         //if date updated when plan was in non-normal phase
//     //         const job: AgendaJob = {
//     //             data: {
//     //                 userId,
//     //                 planId: currentPlanId,
//     //                 planCurrentPhase: PlanPhaseEnum.NORMAL,//this does not matter , it can be any phase
//     //                 planExpiryDate: currentPlanExpiryDate,
//     //                 durationMonths: currentPlanDurationMonths,
//     //                 logId,
//     //                 crmId,
//     //                 emailId,
//     //                 planName: currentPlanName
//     //             },
//     //             name: JobNamesEnum.PLAN_PHASE_TRANSITION,
//     //             nextRunAt: null as any
//     //         }

//     //         const nextPhaseJob = await this.converterService.getNextPhaseJob(job, phaseAfterDateUpdate);
//     //         const notifJob = await this.converterService.getNotificationJob(job, phaseAfterDateUpdate, nextNotifJobDate);

//     //         //save in db
//     //         const createdJob = await this.agendaJobDao.create(nextPhaseJob);
//     //         await this.agendaJobDao.create(notifJob);
//     //         this.logService.info(logId, `successfully executed handleDateUpdate`);

//     //         //inform kwb
//     //         // await this.queueProducerService.sendPlanTransitionEvent(createdJob, phaseAfterDateUpdate);

//     //     } catch (e) {
//     //         this.errorHandlerService.handleError(e, "", { methodName: "handleDateUpdate", sendErrorNotification: true });
//     //     }

//     // }

//     // async handleRenewalDone(parsedData: QueueEventNew<RenewalDoneEvent>) {
//     //     try {
//     //         const { logId, eventData, userDetails } = parsedData;
//     //         const { deleteAllOldPlan, deletePlanIds, userId, currentPlanName } = eventData;
//     //         this.logService.info(logId, `inside handleRenewalDone...`);
//     //         this.logService.printObject(logId, eventData);
//     //         this.logService.printObject(logId, userDetails);

//     //         const activeJob = await this.agendaJobDao.getActiveJobByUserIdAndPlanName(userId, currentPlanName);

//     //         if (deleteAllOldPlan) {
//     //             await this.agendaJobDao.disableAllJobsByUserId(userId);
//     //             this.logService.info(logId, `Disabled all jobs`);
//     //         } else if (deletePlanIds && deletePlanIds.length > 0) {

//     //         }

//     //         //create new phase-1 job
//     //         const jobCreated = await this.createInitialScheduleAfterRenewal(parsedData, activeJob);

//     //         //inform kwb
//     //         // await this.queueProducerService.sendPlanTransitionEvent(jobCreated, PlanPhaseEnum.NORMAL);
//     //         this.logService.info(logId, `successfully executed handleRenewalDone`);

//     //     } catch (e) {
//     //         this.errorHandlerService.handleError(e, "", { methodName: "handleRenewalDone", sendErrorNotification: true });
//     //     }

//     // }

//     // async createInitialSchedule(parsedData: QueueEventNew<PlanDueDateUpdateEvent>) {
//     //     const { logId, eventData, userDetails } = parsedData;
//     //     const { crmId, emailId } = userDetails;
//     //     const { userId, currentPlanId, currentPlanDurationMonths, currentPlanExpiryDate, currentPlanName } = eventData;

//     //     this.logService.info(logId, `inside createInitialSchedule `);
//     //     const planPhaseDetails = await this.planPhaseDetailsDao.getPhaseDetails(PlanPhaseEnum.NORMAL);
//     //     const nextJobDate = this.commonService.getNextPhaseDateFromExpiryDate(PlanPhaseEnum.NORMAL, planPhaseDetails, currentPlanExpiryDate);
//     //     const nextPhaseJob: AgendaJob = {
//     //         data: {
//     //             planId: currentPlanId,
//     //             userId,
//     //             planCurrentPhase: PlanPhaseEnum.NORMAL,
//     //             planExpiryDate: currentPlanExpiryDate,
//     //             durationMonths: currentPlanDurationMonths,
//     //             logId,
//     //             crmId,
//     //             emailId,
//     //             planName: currentPlanName
//     //         },
//     //         name: JobNamesEnum.PLAN_PHASE_TRANSITION,
//     //         nextRunAt: nextJobDate
//     //     };

//     //     this.logService.info(logId, `createInitialSchedule has created data =>`);
//     //     this.logService.printObject(logId, nextPhaseJob.data)
//     //     const jobCreated = await this.agendaJobDao.create(nextPhaseJob);
//     //     this.logService.info(logId, `successfully executed createInitialSchedule ...`);
//     //     return jobCreated;
//     // }

//     // async createInitialScheduleAfterRenewal(parsedData: QueueEventNew<RenewalDoneEvent>, oldActiveJob: AgendaJobDB) {
//     //     const { logId, eventData, userDetails } = parsedData;
//     //     const { currentPlanDurationMonths, currentPlanId, userId, currentPlanName, paymentLink } = eventData;
//     //     const { crmId, emailId } = userDetails;

//     //     this.logService.info(logId, `inside createInitialScheduleAfterRenewal ...`);

//     //     //this is the important step
//     //     //new expiry date = max(payment-date , current-expiry-date) + duration
//     //     const calculatedExpiryDate = this.commonService.getCalculatedExpiryDate(oldActiveJob, eventData, logId);
//     //     const planPhaseDetails = await this.planPhaseDetailsDao.getPhaseDetails(PlanPhaseEnum.NORMAL);
//     //     const nextJobDate = this.commonService.getNextPhaseDateFromExpiryDate(PlanPhaseEnum.NORMAL, planPhaseDetails, calculatedExpiryDate);

//     //     const nextPhaseJob: AgendaJob = {
//     //         data: {
//     //             planId: currentPlanId,
//     //             userId,
//     //             planCurrentPhase: PlanPhaseEnum.NORMAL,
//     //             planExpiryDate: calculatedExpiryDate,
//     //             durationMonths: currentPlanDurationMonths,
//     //             logId,
//     //             crmId,
//     //             emailId,
//     //             planName: currentPlanName,
//     //             paymentLink: (paymentLink) ? paymentLink : ''
//     //         },
//     //         name: JobNamesEnum.PLAN_PHASE_TRANSITION,
//     //         nextRunAt: nextJobDate
//     //     };

//     //     const jobCreated = await this.agendaJobDao.create(nextPhaseJob);
//     //     this.logService.info(logId, `successfully executed createInitialScheduleAfterRenewal ...`);
//     //     return jobCreated;
//     // }

//     // async findCurrentPhaseAfterDateUpdate(parsedData: QueueEventNew<PlanDueDateUpdateEvent>) {
//     //     const { logId, eventData } = parsedData;
//     //     try {

//     //         this.logService.info(logId, `inside findCurrentPhaseAfterDateUpdate ...`);

//     //         const { currentPlanExpiryDate, userId, currentPlanId } = eventData;

//     //         const allPhasesSorted: PlanPhaseDetailsDB[] = await this.planPhaseDetailsDao.getAllPhaseDetails();
//     //         const dateNow = moment();

//     //         let i: number = 0;

//     //         for (const phase of allPhasesSorted) {
//     //             const { planPhaseName } = phase;
//     //             const phaseEndDate = this.commonService.getJobEndDateFromExpiryDate(null as any, phase, currentPlanExpiryDate);
//     //             const diff = moment(phaseEndDate).diff(dateNow);

//     //             if (diff > 0) {
//     //                 this.logService.info(logId, `for phase=[${planPhaseName}] , the difference from now=[${diff}] , so returning`);
//     //                 return {
//     //                     phaseAfterDateUpdate: allPhasesSorted[i].planPhaseName,
//     //                     nextNotifJobDate: new Date(2021, 2, 2) //to-do check if any-back date would work here ?
//     //                 };
//     //             } else {
//     //                 this.logService.info(logId, `for phase=[${planPhaseName}] , the difference from now=[${diff}] , so not-returning`);
//     //             }

//     //             i++;
//     //         }

//     //         throw new Error(`invalid expiry date for userId=[${userId}] , planId=[${userId}] , currentPlanExpiryDate=[${currentPlanExpiryDate}]`)
//     //     } catch (e) {
//     //         this.errorHandlerService.handleError(e, logId, { methodName: "findCurrentPhaseAfterDateUpdate", sendErrorNotification: true });
//     //     }

//     // }

// }
