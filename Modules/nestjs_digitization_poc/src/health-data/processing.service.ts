import {Inject} from "@nestjs/common"
import {LogService} from '../common/services/log.service'
import {TestsDao} from "../dao/tests.dao"
import {AxiosService} from "../common/services/axios.service"
import { ErrorHandlerService } from '../common/services/errorHandler.service';
import { HttpException, HttpStatus} from '@nestjs/common';

import {MiscMessages,ReportProcessingSourceEnum,PendingTestValidityEnum,DigitisationStatusEnum} from "../constants/appConstants"
export class ProcessingService{
    @Inject()
    private logService:LogService

    @Inject()
    private testsDao:TestsDao

    @Inject()
    private axiosService : AxiosService

    @Inject()
    private errorHandlerService:ErrorHandlerService;


    async saveTest( ingestReq:any , reportSource:any , ctxId:string){
            this.logService.info(ctxId,"reached inside savePendingTest from reportSource =>",reportSource);
    
            const { hsId , emailId , reportUrl , ingestedUserTestEntries,sampleMetaData,partnerName,testType } = ingestReq ;
    
            try{
    
                const userData = await this.axiosService.userDataFromHubspotId(hsId,ctxId);
                this.logService.info(ctxId,`userData=>`,userData);
    
                const { userId , kenkoScore , bmi } = userData ;
    
                if ( !reportUrl.startsWith('http') ) {
    
                    this.logService.info(ctxId,`reportUrl => [${reportUrl}] invalid, Doing no process , sending slack notif`);
                    this.errorHandlerService.handleError(`Invalid report Url----->${reportUrl}`,ctxId, {
                        methodName: 'mannual-test',
                        sendErrorNotification: true,
                      });    
                    return MiscMessages.NO_OPERATION;
    
                }


                // ----------------********not require to delete because we are already deprecating tests******-------------
    
                // const isReportAlreadyExists = await this.testsDao.pendingTest({ userHubspotId: hsId , validity:"NEW"});
                // this.logService.info(ctxId,`isReportAlreadyExists =>`, isReportAlreadyExists);
    
                // if (isReportAlreadyExists) {
                //     this.logService.info(ctxId,`Report already exists for same hubspot user, setting validity to DEPRECATED`);
    
                //     await this.testsDao.softDeleteTest({ userHubspotId: hsId });
                // }
    
                const isSafeUrl = await this.reportUrlSafeOrNot(reportUrl);
    
                this.logService.info(ctxId,`isSafeUrl =>`,isSafeUrl);
    
                const userDetials={
                    userId ,
                    kenkoScore ,
                    bmi,
                    emailId,
                    hubspotId:hsId,

                }
    
                const toMakePendingTest: any = {
                    
                    reportData: reportUrl,
                    testType,
                    userHubspotId: hsId,
                    reportSource,
                    isSafeUrl,    
                    partnerName            
                }
    
                if (reportSource===ReportProcessingSourceEnum.INGEST_EVENT) {
                    toMakePendingTest.validity = PendingTestValidityEnum.PARTIAL 
                    toMakePendingTest.digitisationStatus = DigitisationStatusEnum.PARTIAL
                }
                
                this.logService.info(ctxId,`toMakePendingTest =>`,toMakePendingTest);
    
                const createdPendingTest = await this.testsDao.createTest(toMakePendingTest,userDetials,ingestedUserTestEntries,sampleMetaData);
            
                this.logService.info(ctxId,`createdPendingTest is => =>`,createdPendingTest);
    
                return MiscMessages.SUCCESS;
    
            }
            catch(e){
                this.logService.error(ctxId,'error in savePendingTest',e);
                throw new HttpException('Invalid input ' + e, HttpStatus.BAD_REQUEST);
            }
    
    }

    async reportUrlSafeOrNot ( reportUrl : string ) {

            if (reportUrl.includes('and-assets') || reportUrl.includes('and-assets')) {
                // report url is safe
                return true ; 
            }
    
            // report url is open , not safe
            return false ;
    
    }


    async deprecateDuplicates ( userHubspotId : string , testType : string , ctx :string ) {
                // use $not in query to not update any report which is not new or partial
                const findCriteria = {userHubspotId,testType,digitisationStatus:{in:[DigitisationStatusEnum.NEW, DigitisationStatusEnum.PARTIAL]}};
                const updateCriteria = {
                    validity : PendingTestValidityEnum.DEPRECATED
                };
            const result = await this.testsDao.updateManyTests(findCriteria,updateCriteria);
        // if deprecateold will return how many got deprecated {
        const {modifiedCount}:any=result
        if(!modifiedCount){
            let testInMotionResult= await this.testsDao.countTests({userHubspotId,testType:"PPMC",digitisationStatus:{in:[DigitisationStatusEnum.REJECTED_BY_QA, DigitisationStatusEnum.DIGITIZED ,DigitisationStatusEnum.APPROVED]}})
            if(testInMotionResult) {
                this.errorHandlerService.handleError(`Processed report found,skipping this------>[${userHubspotId}], Report Ingestion`, ctx, {
                    methodName: 'mannual-test',
                    sendErrorNotification: true,
                  });

            throw new HttpException('Processed report found ' , HttpStatus.BAD_REQUEST);
            
            } 
            return
            
        }

        return MiscMessages.SUCCESS;

    }


}