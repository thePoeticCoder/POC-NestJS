import {Inject,Injectable} from "@nestjs/common"
import {MiscMessages,ReportProcessingSourceEnum,QueueEventEnum,QueueConstants} from "../constants/appConstants"
import {LogService} from '../common/services/log.service'
import {TestsDao} from "../dao/tests.dao"
import {ProcessingService} from "../health-data/processing.service"
import {RequiredOrganMarkerDao} from '../dao/requiredOrganMarker.dao'
import {MetaDataDao} from '../dao/metaData.dao'
import {UsersDao} from "../dao/users.dao"
import { Producer } from "src/micro-services/producer"
import { HttpException, HttpStatus} from '@nestjs/common';
import { helperErrorHandlerService } from "src/common/services/errorHandlerHelper.service";

@Injectable()
export class WebhookService{

    @Inject()
    private logService: LogService;

    @Inject()
    private testsDao:TestsDao

    @Inject()
    private processingService:ProcessingService

    @Inject()
    private markerDao:RequiredOrganMarkerDao

    @Inject()
    private metaDataDao:MetaDataDao

    @Inject()
    private producer:Producer

    @Inject()
    private usersDao:UsersDao

    @Inject()
    private helperErrorHandler:helperErrorHandlerService;

 

    async mapIngestedTestsWithIds (userTestEntries:any,testType:string,ctx:string) {

        const allMarkersList = await this.markerDao.list(testType);
        let toIngestMarkersList = [];

        for await (const userTestEntry of userTestEntries) {

            const { testName , value } = userTestEntry;

            this.logService.info(ctx,`checking for testName => ${testName}`);

            const currentMarker : any = allMarkersList.find((marker:any)=>{return marker.markerName===testName});
            
            if ( currentMarker ) {

                this.logService.info(ctx,`found currentMarker => ${currentMarker}`);
                const {id:markerId}=currentMarker
                const toIngestMarker : any = {
                    value,
                    markerId
                }

                toIngestMarkersList.push(toIngestMarker);

            } else {
                this.logService.info(ctx,`not found currentMarker for test name => ${testName}`);
            }

        }

        return toIngestMarkersList;

    }

    async processIngestedDataFromEvent(parsedEvent : any , ctx : string){

        try{

        // parsed event is pending test from healthdata app
        const { userHubspotId , reportData , userTestEntries , testType = "PPMC", partnerName="UNKNOWN" } = parsedEvent;
        
        this.logService.info(ctx,`inside processIngestedDataFromEvent with parsedEvent =>`,parsedEvent);

        const ingestedUserTestEntries = await this.mapIngestedTestsWithIds(userTestEntries,testType ,ctx);
        this.logService.info(ctx,'ingestedUserTestEntries =>',ingestedUserTestEntries);
        const metaDataRes=await this.metaDataDao.findMetaData()

        const ingestReq : any = {
            hsId : userHubspotId,
            reportUrl : reportData[0],
            testType ,
            ingestedUserTestEntries,
            sampleMetaData:metaDataRes,
            partnerName
        }

        try{
            // handle duplicacy 
            await this.processingService.deprecateDuplicates(userHubspotId,testType,ctx);
            await this.processingService.saveTest( ingestReq , ReportProcessingSourceEnum.INGEST_EVENT , ctx );

            this.logService.info(ctx,`Made pending test from event, creating custom object and associating now`);
            

            if( process.env.NODE_ENV==="prod"){
                    await this.producer.sendDigitizationEvent(ctx,QueueEventEnum.GENERATE_CUSTOM_OBJECTID,QueueConstants.QUEUE_HUBSPOT_DIGITIZATION,{userHubspotId,testType,ctx});    
               
            }    

            return MiscMessages.SUCCESS;

        } catch (e) {
            this.logService.error(ctx,`error in processIngestedDataFromEvent =>`,e);
            throw new HttpException('Invalid input ' + e, HttpStatus.BAD_REQUEST);
        }
    }catch(e){
     throw e       
}
}

    

// this is method is not using so avoid if is there any commented code avialble--that is for further addons if require! 
    async processIngestedData(ingestReq: any, ctx: any) {
        this.logService.info(ctx, `Inside processIngestedData`);

        //step-1 : secure url
        //step-2 : do processing of report (use URL and partner name)
        //step-3 : pass yes/no/mayB to HS via crm-service

        // create and associate custom object 

        const { hsId , reportUrl , testType = "PPMC"} = ingestReq ;

        this.logService.info(ctx, `Sending to create pending test from webhook for hubspotid =>`,hsId);

        try {
            // pendingTest.testType = this.evaluateTestType(ingestReq,ctx);
           
            // await this.deprecateDuplicates(hsId,testType,ctx);
            await this.processingService.saveTest( ingestReq , ReportProcessingSourceEnum.CRM_WEBHOOK , ctx.id );

            this.logService.info(ctx,`Made pending test , creating custom object and associating now`);
            if( process.env.NODE_ENV==="prod"){

                // await this.hubspotService.postIngestionProcess(testType,hsId,ctx);
            }    

            return MiscMessages.SUCCESS;
            
        }
        catch (e) {
            this.logService.error(ctx,`error in processIngestedData =>`,e);
            // throw new CheckedException(`Error in processIngestedData`);
        }

    }



    async updateOwnersOfReports ( body : any , ctx : any ) {
        this.logService.info(ctx, `Inside updateOwnersOfReports`);

        const { hsId , customObjectId , digitisationOwner , qaOwner } = body;

        this.logService.info(ctx,`hsId => ${hsId} , customObjectId => ${customObjectId}`);
        this.logService.info(ctx,`digitisationowner => ${digitisationOwner} , qaOwner => ${qaOwner}`);

        try {

            const findPendingTestCriteria = {
                userHubspotId : hsId , 
                ticketId : customObjectId
            };

            this.logService.info(ctx,`findPendingTestCriteria =>`,findPendingTestCriteria);

            const updatePendingTestCriteria = {
                digitisationOwner,
                qaOwner
            };

            this.logService.info(ctx,`updatePendingTestCriteria =>`,updatePendingTestCriteria);


            const updatePendingUserTest = await this.testsDao.updateManyTests(findPendingTestCriteria,updatePendingTestCriteria);

            this.logService.info(ctx,`updatePendingUserTest =>`,updatePendingUserTest);

            return MiscMessages.SUCCESS ;

        }
        catch (e) {
            this.logService.error(ctx,`error in processIngestedData =>`,e);
            throw new HttpException('Error,Update Owners ' + e, HttpStatus.BAD_REQUEST);
        }

    }









       //////////////////////////////////////////////////////////////////////////////
    // ? NEW INGESTION LAYER
     //////////////////////////////////////////////////////////////////////////////
     
    async hubspotIngestion ( dataFromHubspot : any , ctx : string) {

        const { vid : hsId , properties } = dataFromHubspot;

        this.logService.info(ctx,`fields in body =>`,Object.keys(dataFromHubspot));

        const { medical_reports , health_id , health_data_digitisation_owner , health_data_qa_owner } = properties;

        this.logService.info(ctx,`fields in properties =>`,Object.keys(properties));

        const ingestionSteps = [];
        const hubspotBodyErrors = [];

        let hubspotBodyErr ;

        if (!medical_reports) {
            hubspotBodyErr = `medical_reports not present in hubspot req body`
            this.logService.error(ctx,hubspotBodyErr)
            hubspotBodyErrors.push(hubspotBodyErr)
        }
        if (!hsId){
            hubspotBodyErr = `vid not present in hubspot req body`
            this.logService.error(ctx,hubspotBodyErr)
            hubspotBodyErrors.push(hubspotBodyErr)
        }
        if (!health_id){
            hubspotBodyErr = `health_id not present in hubspot req body`
            this.logService.error(ctx,hubspotBodyErr)
            hubspotBodyErrors.push(hubspotBodyErr)
        }
        if (!health_data_digitisation_owner){
            hubspotBodyErr = `health_data_digitisation_owner not present in hubspot req body`
            this.logService.error(ctx,hubspotBodyErr)
            hubspotBodyErrors.push(hubspotBodyErr)
        }
        if (!health_data_qa_owner){
            hubspotBodyErr = `health_data_qa_owner not present in hubspot req body`
            this.logService.error(ctx,hubspotBodyErr)
            hubspotBodyErrors.push(hubspotBodyErr)
        }

        ingestionSteps.push(`HUBSPOT_REQ_BODY_FIELDS => ${hubspotBodyErrors.join(', ')}`);

        try {

            const { value : reportUrl } = medical_reports; // report url
        
            // determine if its first ( create ) or second ( update owners ) webhook

            if ( !health_id ) {
                const msg = `custom object and owners info not available , Invoking create webhook`
                this.logService.info(ctx,msg);
                ingestionSteps.push(`STEP => ${msg}`);


                const ingestReq : any = {
                    hsId,
                    reportUrl,
                    testType : "PPMC"
                }

                this.logService.info(ctx,`ingestReq`,ingestReq);

                await this.processIngestedData(ingestReq,ctx);

                return MiscMessages.SUCCESS;

            }

            const { value : customObjectId } = health_id; // custom object
            const { value : digitisationOwnerId } = health_data_digitisation_owner;  // data entry person
            const { value : qaOwnerId } = health_data_qa_owner; // qa person

            if ( customObjectId && digitisationOwnerId && qaOwnerId ) {

                const msg = `custom object and owners info available , Invoking update webhook`
                this.logService.info(ctx,msg);
                ingestionSteps.push(`STEP => ${msg}`);

                this.logService.info(ctx,`digitisationOwnerId = [${digitisationOwnerId}] & qaOwnerId => [${qaOwnerId}]`);

                const ownerInfo = await this.usersDao.find({or:[{hubspotId:digitisationOwnerId},{hubspotId:qaOwnerId}]});

                const digitisationOwnerInfo =  ownerInfo.find((owner:any)=>{return owner.role.includes("DATAENTRYUSER") })

                const qaOwnerInfo =  ownerInfo.find((owner:any)=>{return owner.role.includes("QA_PERSON") })

                this.logService.info(ctx,`digitisationOwnerInfo`,digitisationOwnerInfo);
                this.logService.info(ctx,`qaOwnerInfo`,qaOwnerInfo);
                
                const updateOwnersReq : any = {
                    hsId,
                    customObjectId,
                    digitisationOwner : digitisationOwnerInfo.emailId ,
                    qaOwner : qaOwnerInfo.emailId
                }

                this.logService.info(ctx,`updateOwnersReq`,updateOwnersReq);
    
                const isUpdated = await this.updateOwnersOfReports(updateOwnersReq,ctx);

                if (!isUpdated) {

                    const msg = `updating failed so creating new for hsid => ${hsId}`
                    this.logService.info(ctx,msg);
                    ingestionSteps.push(`STEP => ${msg}`);

                    const ingestReq : any = {
                        hsId,
                        reportUrl,
                        testType : "PPMC"
                    }
        
                    this.logService.info(ctx,`ingestReq`,ingestReq);
        
                    await this.processIngestedData(ingestReq,ctx);
        
                }

                return MiscMessages.SUCCESS;

            }

        }
        catch(e){
            this.logService.error(ctx,`error in hubspotIngestion => ${JSON.stringify(e)}`);
            this.helperErrorHandler.notificationService(e,ctx,"approveOrRejectUserTest  (method) TestsService service",true,`error = ${e.messages} = ${ingestionSteps.join(' , \n')}`);
            return MiscMessages.FAILURE;
        }

    }


    
}