import { Inject, Injectable,  HttpException, HttpStatus} from "@nestjs/common";
import {DigitisationStatusEnum,HubspotStatusEventsIdsEnum,QueueEventEnum,MarkerRangeEnum,requiredSampleTypeEnums,ToDoUserTestUpdateEnum,MiscMessages} from '../../constants/appConstants'
import {TestsDao} from '../../dao/tests.dao'
import { LogService } from "src/common/services/log.service";
import { RequiredOrganMarkerDao } from "src/dao/requiredOrganMarker.dao";
import {UserMarkerDao} from "../../dao/userMarkers.dao"
import { MetaDataDao } from "src/dao/metaData.dao";
import {DryTests} from "../../dry/tests"
import {OrganMarkerDao} from "../../dao/organMarker.dao"
import {OrgansDao} from "../../dao/organs.dao"
import {TestMetaDataDao} from "../../dao/testMetaData.dao"
import { AxiosService } from "src/common/services/axios.service";
import {DiagnosisDao} from "../../dao/diagnosis.dao"
import { Producer } from "src/micro-services/producer";
import { TestTypeDao } from "src/dao/testType.dao";
import {TestsQueryParams,TestsBody,ApporveOrRejectBody,MannualTest} from "../../dto/tests.dto"
import { helperErrorHandlerService } from "src/common/services/errorHandlerHelper.service";
import {pendingTests,searchCriteriaType} from "../../types/tests.types"
import { Tests, } from "@prisma/client";
@Injectable()
export class TestsService{

    @Inject(TestsDao)
    private testsDao:TestsDao

    
    @Inject()
    private helperErrorHandler:helperErrorHandlerService;

    @Inject(LogService)
    private logService:LogService

    @Inject()
    private markersDao:RequiredOrganMarkerDao

    @Inject()
    private userMarkerDao:UserMarkerDao

    @Inject()
    private metaDataDao:MetaDataDao

    @Inject()
    private dryTests:DryTests

    @Inject()
    private organMarkersDao:OrganMarkerDao

    @Inject()
    private organsDao:OrgansDao

    @Inject()
    private testMetaDataDao:TestMetaDataDao

    @Inject()
    private axiosService:AxiosService

    @Inject()
    private diagnosisDao:DiagnosisDao

    @Inject()
    private producer:Producer

    
    @Inject()
    private testTypeDao: TestTypeDao
 
    async diagnosticResultsFromMarkersResp(organs,markersRespMetaCollection,ctxId){
        try{
            this.logService.info(ctxId,`inside try block of diagnosticResultsFromMarkersResp (method) TestsService (service) =>`,organs);
            const organsDiagnosticResults = [];
            // let invalidMarkersList=[]
            for await (const organ of organs) {
            // organsDiagnosticResults
            const { id , organName , organNormalIcon,organAbnormalIcon,organInactiveIcon } = organ ;
            
            const allOrganTests = markersRespMetaCollection.filter((markersRespMeta:any)=>{return markersRespMeta.markerRelatedOrgan == id && !markersRespMeta.isInvalid });            
            const organTestsOutOfRange = allOrganTests.filter((organTest:any)=>{return !organTest.isInvalid && organTest.markerRange!=MarkerRangeEnum.NORMAL_RANGE })

            const organTestsNormal = allOrganTests.filter((organTest:any)=>{return !organTest.isInvalid && organTest.markerRange==MarkerRangeEnum.NORMAL_RANGE })

            const InvalidMarkers=allOrganTests.filter((organTest:any)=> organTest.isInvalid )
            
            const organOutOfRange = organTestsOutOfRange.length;
            
            const organCurrentIcon = (!organOutOfRange) ? organNormalIcon : (organOutOfRange) ? 
            organAbnormalIcon :organInactiveIcon ;
            
            const diagnosticResult : any = {
                organId : id ,
                organName ,
                organCurrentIcon ,
                organOutOfRange ,
                organNormalRange:organTestsNormal.length,
                organInvalidRange:InvalidMarkers.length,
            }
            organsDiagnosticResults.push(diagnosticResult);
        }
        return {organsDiagnosticResults};
    }catch(err){
        this.helperErrorHandler.notificationService(err,ctxId,"diagnosticResultsFromMarkersResp (method) TestsService",true,organs)
    }
}
    async pendingTests(query:TestsQueryParams,body:TestsBody,ctxId:string) : Promise<pendingTests> {
        try{
            this.logService.info(ctxId,`inside try block of pendingTests (method) TestsService (service) =>`,query);
            const searchCriteria:searchCriteriaType   = { digitisationStatus : { in : [ DigitisationStatusEnum.NEW , DigitisationStatusEnum.PARTIAL]}, validity: {not:"DEPRECATED"} };
            const searchCriteriaForRejectedList ={digitisationStatus:DigitisationStatusEnum.REJECTED_BY_QA,validity: {not:"DEPRECATED"}}

            const { searchKey, status } = query;
            query.flag=0
            const { sortingFields , dateRange , forOwner } = body;

        if (forOwner) {
            searchCriteria["digitisationOwner"] = forOwner
        }

        if (searchKey) {
            searchCriteria["OR"] = [{ userHubspotId: {startsWith:searchKey} }, { emailId: {startsWith:searchKey} }]
        }
        const rejectedList=await this.testsDao.tests({...searchCriteria,...searchCriteriaForRejectedList},query,{sortField:"updatedAt",sortType:"asc"})
        const totalPendingTests=await this.testsDao.countTests({...searchCriteria,digitisationStatus:{ in : [ DigitisationStatusEnum.NEW , DigitisationStatusEnum.PARTIAL,DigitisationStatusEnum.REJECTED_BY_QA]}})
        const totalRejectedListCount=await this.testsDao.countTests({...searchCriteria,digitisationStatus:DigitisationStatusEnum.REJECTED_BY_QA})
        let pendingTestsList:Tests[]=[...rejectedList]

        if(rejectedList.length !==Number(query.limit)){
            query.limit=(query.limit-rejectedList?.length)
            // here page number is modified and added flag(rejected tests count to get required docs)
            query.flag=totalRejectedListCount
            const  pendingTestsListWithoutRejects= await this.testsDao.tests(searchCriteria, query , {sortField:"updatedAt",sortType:"asc"},);    
            pendingTestsList= [...pendingTestsList,...pendingTestsListWithoutRejects]
        }

        return { pendingTestsList, totalPendingTests };

    }catch(err){
        this.helperErrorHandler.notificationService(err,ctxId,"diagnosticResultsFromMarkersResp  (method) TestsService (service)",true,query)
    }
    }

    async requiredMarkers(pendingTestId:string,ctxId:string){
        let metaDataMarkers
        try {
        this.logService.info(ctxId,`inside try block of requiredMarkers  (method) TestsService (service) =>`,pendingTestId);
            const findOneCriteria = {
                id : pendingTestId
            }

            const pendingTestDetails:Tests = await this.testsDao.pendingTest(findOneCriteria);
                if (!pendingTestDetails){
                    this.logService.error(ctxId,`pending user test with pendingTestId => [${pendingTestId}] does not exist`);
                }
    
                const { testType , digitisationStatus , ticketId = "" } = pendingTestDetails;
                let userTestEntries=await this.userMarkerDao.getUserMarker({testId:pendingTestId,isActive:true})
    
                const requiredMarkers = await this.markersDao.list(testType||"PPMC");
    
                if(!requiredMarkers.length) {

                    this.logService.error(ctxId,`required marker list was not available in processing service`);
                    throw new HttpException('required marker list was not available in processing service', HttpStatus.BAD_REQUEST);
                }
    
                let finalListToSend = [];
    
                if ( digitisationStatus === DigitisationStatusEnum.PARTIAL) {

                    let missingMarkers=[]
    
                    for await (const requiredMarker of requiredMarkers) {
    
                        this.logService.info(ctxId,`requiredMarker =>`,requiredMarker);
                        
                        const findMatchingMarker = userTestEntries.find((entry:any)=>{
                    
                            return entry.markerId==requiredMarker.id
                        });
    
                        if (!findMatchingMarker){
                            this.logService.info(ctxId,`requiredMarker => [${requiredMarker.markerName}] not found in partial entries`)
                            // userTestEntries.push(requiredMarker)======>here i'm creating missing marker in db agian
                            missingMarkers.push({testId:pendingTestId,markerId:requiredMarker.id})
                        }
                        
                    }
                    if(missingMarkers.length){
                        await this.userMarkerDao.createUserMarker(missingMarkers)
                    }
                    await this.markersDao.getMarkersDetials(pendingTestId)
                    metaDataMarkers=await this.metaDataDao.findMetaData()
                }
    
            if(process.env.NODE_ENV==="Prod"){
                this.logService.info(ctxId,`Updating custom object stage to ${HubspotStatusEventsIdsEnum.DIGITISATION_STARTED}`)
                await this.producer.sendDigitizationEvent(ctxId,"UPDATE_CUSTOM_OBJECTID_STATUS","QUEUE_HUBSPOT_DIGITIZATION",{ticketId,status:HubspotStatusEventsIdsEnum.DIGITISATION_STARTED})

            }
    
                return {
                    pendingTestDetails,
                    finalListToSend,
                    userTestEntries,
                    requiredMarkers,
                    sampleMetaData:{metaDataMarkers},
                    sampleTypeEnums:requiredSampleTypeEnums
                };
            
    
            }
            catch (err) {
            this.helperErrorHandler.notificationService(err,ctxId,"requiredMarkers  (method) TestsService (service)",true,pendingTestId);
            throw new HttpException('Invalid input ' + err, HttpStatus.BAD_REQUEST);
            }
    
    }

    //with dynamic markers-paras changes
    async processTest(body: MannualTest, decoded: any, ctxId: string) {
           
        try {
            this.logService.info(ctxId,`inside try block of processTest  (method) TestsService (service) =>`,body);

            const { testResults,pendingTestId, setSampleMetaData, testTypeName = "PPMC", isDynamic } = body;
            this.logService.info(ctxId, `body =>`, body);

            let errMsg = "Error in evaluateTest";
            
            // const { requiredTestMarkers,sampleMetaData } = testType;
            let sampleMetaData = await this.metaDataDao.findMetaData()

            const dummyMetaMarkers: any = {}

            if (setSampleMetaData) {
                if (sampleMetaData) {
                    for (let i = 0; i < sampleMetaData.length; i++) {
                        dummyMetaMarkers[sampleMetaData[i].markerName] = sampleMetaData[i].id
                    }
                }

                for (let j = 0; j < setSampleMetaData.length; j++) {
                    if (setSampleMetaData[j].markerName in
                        dummyMetaMarkers) {
                        setSampleMetaData[j].metaDataId =
                            (dummyMetaMarkers[setSampleMetaData[j].markerName])
                    }
                }


            }

            const requiredMarkers = await this.markersDao.list(testTypeName || "PPMC");

            // validate if all required markers are present in req.body
            if(!isDynamic){        
            const validateBody = await this.dryTests.validateBody(requiredMarkers, testResults, ctxId);

            if (!validateBody.allRequiredMarkersAvailable) {
                errMsg = `All required markers not found in body , missing markers [ ${validateBody.missingMarkers.join(' , ')} ]`;
                this.logService.info(ctxId, errMsg);
                throw new HttpException(errMsg, HttpStatus.BAD_REQUEST);
            }
          }

            // ? fetch all organ objects
 
            const markerIds = requiredMarkers.map((marker: any) => marker.id)
            const organIdsWithMarkers = await this.organMarkersDao.getOrganIds(markerIds)
            const organIds = organIdsWithMarkers.reduce((acc, cv) => {
                let organFound = false
                for (let i = 0; i < acc.length; i++) {
                    if (acc[i] == cv.organId) {
                        return acc
                    }
                }
                acc.push(cv.organId)
                return acc
            }, [])
            const organs = await this.organsDao.getOrgans(organIds);
            const markersRespMetaCollection: any = [];

            this.logService.info(ctxId, `requiredTestMarkers len => ${requiredMarkers.length}`)
            let requiredTestResults = []

            let counter = 0
            for await (const requiredTestMarker of requiredMarkers) {

                const { id, markerUnit, markerName, normalRangeLowerLimit, normalRangeUpperLimit, abnormalRangeLowerLimit, abnormalRangeUpperLimit, emergencyRangeLowerLimit, emergencyRangeUpperLimit } = requiredTestMarker;

                const testResult: any | undefined = testResults.find((testResult: any) => { return testResult.testName === markerName }); // any just to calm it down as the availability of test is already checked in validation

                if (!testResult) {
                    errMsg = `TestResult for ${markerName} not found`;
                    this.logService.error(ctxId, errMsg);
                    throw new HttpException(errMsg, HttpStatus.BAD_REQUEST);
                }

                const {value, isInvalid, comment = null } = testResult;

                this.logService.info(ctxId, `Processing test [${markerName}]`, requiredTestMarker);

                let markersRespMeta: any

                let markerRelatedOrgan: any = organIdsWithMarkers.filter((marker) => marker
                    .markerId == id)
                markerRelatedOrgan = markerRelatedOrgan[0].organId

                requiredTestResults = [...requiredTestResults, { value, markerId: id, comment, testId: pendingTestId }]


                if (isInvalid) {

                    requiredTestResults[counter].status = MarkerRangeEnum.INVALID
                    markersRespMeta = {
                        id,
                        markerName,
                        markerUnit,
                        markerRangeNormalLimits: [normalRangeLowerLimit, normalRangeUpperLimit],
                        markerRangeAbnormalLimits: [abnormalRangeLowerLimit, abnormalRangeUpperLimit],
                        markerRangeEmergencyLimits: [emergencyRangeLowerLimit, emergencyRangeUpperLimit],
                        isInvalid,
                        markerRelatedOrgan
                    }

                    markersRespMetaCollection.push(markersRespMeta);

                } else if (value) {

                    let markerRange = MarkerRangeEnum.ABNORMAL_RANGE;

                    this.logService.info(ctxId, `checking for test ${markerName} => ${value}`);

                    if (normalRangeLowerLimit <= parseFloat(value) && parseFloat(value) <= normalRangeUpperLimit) {
                        this.logService.info(ctxId, `Marker [${markerName} = ${value}] in normal range [${normalRangeLowerLimit} >= {${value}} <= ${normalRangeUpperLimit}]`);
                        markerRange = MarkerRangeEnum.NORMAL_RANGE;

                    } else if (abnormalRangeLowerLimit <= parseFloat(value) && parseFloat(value) <= abnormalRangeUpperLimit) {
                        this.logService.info(ctxId, `Marker [${markerName} = ${value}] in abnormal range [${abnormalRangeLowerLimit} >= {${value}} <= ${abnormalRangeUpperLimit}]`);
                        markerRange = MarkerRangeEnum.ABNORMAL_RANGE;

                    } else if (emergencyRangeLowerLimit <= parseFloat(value) && parseFloat(value) <= emergencyRangeUpperLimit) {
                        this.logService.info(ctxId, `Marker [${markerName} = ${value}] in emergency range [${emergencyRangeLowerLimit} >= {${value}} <= ${emergencyRangeUpperLimit}]`);
                        markerRange = MarkerRangeEnum.EMERGENCY_RANGE;

                    }
                    requiredTestResults[counter].status = markerRange
                    markersRespMeta = {
                        id,
                        markerName,
                        markerUnit,
                        markerRange,
                        markerValue: value,
                        markerRangeNormalLimits: [normalRangeLowerLimit, normalRangeUpperLimit],
                        markerRangeAbnormalLimits: [abnormalRangeLowerLimit, abnormalRangeUpperLimit],
                        markerRangeEmergencyLimits: [emergencyRangeLowerLimit, emergencyRangeUpperLimit],
                        isInvalid: false,
                        markerRelatedOrgan
                    }
                    counter++
                    markersRespMetaCollection.push(markersRespMeta);


                }
            }

            // todo : add user test entries in id format as done in ingestion and update them in pending test as well as user test
            const response: any = await this.diagnosticResultsFromMarkersResp(organs, markersRespMetaCollection, ctxId);

            const { organsDiagnosticResults: diagnosticResults } = response

         

            await this.diagnosisDao.diagnosisResults(diagnosticResults, pendingTestId)
            this.logService.info(ctxId,`markersRespMetaCollection len => [${markersRespMetaCollection.length}]`);

            // insert user meta data
            await this.testMetaDataDao.createTestMetaData(setSampleMetaData, pendingTestId)

            // update pending test/test 
            const updatePendingtest = await this.testsDao.updateManyTests({ id: pendingTestId }, { digitisationStatus: DigitisationStatusEnum.DIGITIZED })
            this.logService.info(ctxId, `updated pending test =>`, updatePendingtest);

            if (!updatePendingtest) {
                errMsg = `Pending test not found for pendingTestId ==> ${pendingTestId}`;
                throw new HttpException(errMsg, HttpStatus.BAD_REQUEST);
                
            }
            // now update user test entries
            await this.userMarkerDao.updateUserMarkers(requiredTestResults, pendingTestId)
            // custom object is basically carrying the stages of evaluation , started , evaluated , acccepted/rejected
            const test = await this.testsDao.pendingTest({ id: pendingTestId })
            const { ticketId } = test

            if (process.env.NODE_ENV === "prod") {
            await this.producer.sendDigitizationEvent(ctxId,"UPDATE_CUSTOM_OBJECT","QUEUE_HUBSPOT_DIGITIZATION",{ticketId,status:HubspotStatusEventsIdsEnum.DIGITISATION_STARTED})
            }

            this.logService.info(ctxId,`ticket is updated`)

            this.logService.info(ctxId, `UserTest is created`)

            return "test processed";
        } catch (err) {
            this.helperErrorHandler.notificationService(err,ctxId,"processTest  (method) TestsService (service) ",true,body);
            throw new HttpException('Invalid input ' + err, HttpStatus.BAD_REQUEST);
        }
    }

    

    async testsForQa(body:any,query:any,ctxId){
        try {
        this.logService.info(ctxId,`inside try block of testsForQa  (method) TestsService (service) =>`,body);
        const { searchKey = "" , filters,forOwner:qaOwner} = body ;

        
        let findUserTestsCriteria : any = {
            // isActive : true , 
            digitisationStatus : DigitisationStatusEnum.DIGITIZED,
            qaOwner
        }

        if (searchKey) {
            findUserTestsCriteria={...findUserTestsCriteria, userHubspotId: {$regex:`^${searchKey}`} }
        }

        if (filters) {
            this.logService.info(ctxId,`Filters present`,filters)
            for await (const filter of filters) {

                const { field , values } = filter;

                findUserTestsCriteria[field] = {$in:values}
            }
        }

            const findUserTests = await this.testsDao.tests(findUserTestsCriteria,query)
            const totalCount = await this.testsDao.countTests(findUserTestsCriteria);
            return {findUserTests,totalCount};

        }
        catch(err) {
            this.helperErrorHandler.notificationService(err,ctxId,"testsForQa  (method) TestsService (service)",true,body);
            throw new HttpException('Invalid input ' + err, HttpStatus.BAD_REQUEST);
        }
    }

    async approveOrRejectUserTest(body:ApporveOrRejectBody,decoded:any,toDoStatus:string,ctxId:string){

    try{
        this.logService.info(ctxId,`inside try block of approveOrRejectUserTest  (method) TestsService (service)  =>`,body);
            
        const { pendingTestId:id  , comments, metaDataComments } = body;

        this.logService.info(ctxId,`body =>`,body);

        const { userEmail , userName , userRoles } = decoded;
        if ( comments && toDoStatus===ToDoUserTestUpdateEnum.APPROVE ) {
            this.logService.error(ctxId,`Can not mark approved if comment is present`)
            throw new HttpException('Can not mark approved if comment is present', HttpStatus.BAD_REQUEST);
        }

        const findUserTestCriteria = {
            id , 
            validity : "PARTIAL"
        }

        const updateUserTestCriteria : any = {
            digitisationStatus : toDoStatus === ToDoUserTestUpdateEnum.APPROVE ? DigitisationStatusEnum.APPROVED : toDoStatus === ToDoUserTestUpdateEnum.REJECT ? DigitisationStatusEnum.REJECTED_BY_QA : DigitisationStatusEnum.DIGITIZED,
            // approvedBy : userEmail || "userEmail",
        }
        this.logService.info(ctxId,`findUserTestCriteria =>`,findUserTestCriteria);
        this.logService.info(ctxId,`updateUserTestCriteria =>`,findUserTestCriteria);
        this.logService.info(ctxId,`updatePendingTestCriteria =>`,findUserTestCriteria);

        this.logService.info(ctxId,`updatePendingTestCriteria =>`,updateUserTestCriteria);
        const updatedUserTest = await this.testsDao.updateManyTests(findUserTestCriteria, updateUserTestCriteria);
        // const { isActive }:any = updatedUserTest;
        
        if (!updatedUserTest) {
            this.logService.error(ctxId,`Error in updating UserTest`);
            throw new HttpException('Error in updating UserTest', HttpStatus.BAD_REQUEST);
        }
        
        this.logService.info(ctxId,`usertest updated =>`,updatedUserTest);

        // ---------------------------***get ticket id, if possible get ticket id in the tests update response itself**--------------------
        const test=await this.testsDao.pendingTest({id})

        const { ticketId = "" , id : pendingTestIdfromUserTest } = test;

        const userTestEntries=await this.userMarkerDao.getUserMarker({testId:id,isActive:true})
        const sampleMetaData=await this.testMetaDataDao.getTestMetaData({testId:id,isActive:true})
        if ( toDoStatus === ToDoUserTestUpdateEnum.REJECT && comments ) {

            this.logService.info(ctxId,`${comments.length} ${sampleMetaData} ===============> Comments present in body , adding them in pending test`);

            for await (const markerComment of comments) {
                
                const { comment , markerId } = markerComment;

                this.logService.info(ctxId,`Adding comment in ${markerId}`);

                // ? temporary diabled and tested another way
                const index = await userTestEntries.findIndex((entry:any)=>{return entry.markerId==markerId});

                this.logService.info(ctxId,`index for markerId => [${index}] `);

                if ( index!=-1 ) {
                    userTestEntries[index].comment = comment;
                }
                
            }
            
        }

        if(sampleMetaData){
            
            if(toDoStatus === ToDoUserTestUpdateEnum.REJECT && metaDataComments){
                        metaDataComments.forEach((metaDatacomment,i)=>{
                            delete sampleMetaData[i].id
                        const {markerId,comment}=metaDatacomment
                        const index=sampleMetaData.findIndex((marker : any)=> marker.metaDataId==markerId)

                        if(index!=-1) sampleMetaData[index].comment = comment
                    })

                }
            }

            let updatedUserTestEntries=userTestEntries.map((test)=> {
                delete test.id
                return test
            })

            let commentsUpdated =this.userMarkerDao.updateUserMarkers(updatedUserTestEntries,pendingTestIdfromUserTest)
            
            let metaDataCommentsUpdated= this.testMetaDataDao.createTestMetaData(sampleMetaData,pendingTestIdfromUserTest)
            try{
                await Promise.all([commentsUpdated,metaDataCommentsUpdated])

            }catch(err){
                this.helperErrorHandler.notificationService(err,ctxId,"comments Updated",true,commentsUpdated)
            }
            this.logService.info(ctxId,`comments updated`,commentsUpdated);
        
        if(process.env.NODE_ENV=="prod"){
        const toUpdateStageInCustomObject = toDoStatus === ToDoUserTestUpdateEnum.APPROVE ? HubspotStatusEventsIdsEnum.QA_SUCCESS : toDoStatus === ToDoUserTestUpdateEnum.REJECT ? HubspotStatusEventsIdsEnum.QA_REJECT : HubspotStatusEventsIdsEnum.QA_REJECT ;

        this.logService.info(ctxId,`custom obj`,toUpdateStageInCustomObject);
        this.logService.info(ctxId,`Updating custom object stage to ${toUpdateStageInCustomObject}`)
        await this.producer.sendDigitizationEvent(ctxId,QueueEventEnum.UPDATE_CUSTOM_OBJECTID_STATUS,"QUEUE_HUBSPOT_DIGITIZATION",{ticketId,status:toUpdateStageInCustomObject})
        this.logService.info(ctxId,`Updated custom object`)
        }
        return MiscMessages.SUCCESS;
    }catch(err){
        this.helperErrorHandler.notificationService(err,ctxId,"approveOrRejectUserTest  (method) TestsService service",true,body);
        throw new HttpException('Invalid input ' + err, HttpStatus.BAD_REQUEST);
    }
}

// fetch user test ------------has to split into two api's (customer api and qa api)
    async validateOnlyOneExistInFetchUserTest ( query : any , ctx : any ) {
        try{
        this.logService.info(ctx,`inside try block of validateOnlyOneExistInFetchUserTest  (method) TestsService (service) =>`,query);
        const { hubspotId , userId , testType,id } = query;
        const searchQuery: any = {
            testType ,
            // digitisationStatus : {$in:[DigitisationStatusEnum.DIGITIZED,DigitisationStatusEnum.APPROVED]} ,
            digitisationStatus :DigitisationStatusEnum.DIGITIZED ,
            // isActive : true
            id
        };
        if ( hubspotId && userId ) {
            const errMsg = `HubspotId and Userid both present in req`
            this.logService.error(ctx,errMsg)
            throw new HttpException(errMsg, HttpStatus.BAD_REQUEST);
        }
        if ( hubspotId ) {
            searchQuery.userHubspotId = hubspotId;
        }
        if ( userId ) {
            searchQuery.userId = userId;
        }
        this.logService.info(ctx,`final searchQuery =>`,searchQuery)
        return searchQuery;
    }catch(err){
        this.helperErrorHandler.notificationService(err,ctx,"validateOnlyOneExistInFetchUserTest  (method) TestsService (service) ",true,query);
        throw new HttpException('Invalid input ' + err, HttpStatus.BAD_REQUEST);
    }
    }

    async returnDefaultUserTestResponse ( findOneCriteria : any , ctx : any ) {
        try{
        this.logService.info(ctx,`inside try block of diagnosticResultsFromMarkersResp  (method) TestsService (service) =>`,findOneCriteria);
        const allOrgansList =  await this.organsDao.getOrgans({});
        const diagnosticResultsDefaultResponse = allOrgansList.map( ( organ : any ) => {
            const { _id , organName , organDesign } = organ;
            return {
                organId : _id ,
                organName ,
                organCurrentIcon : organDesign.organInactiveIcon
            }
        });
        const { userHubspotId ,userId, testType } = findOneCriteria;
        const userData = await this.axiosService.userDataFromHubspotId(userHubspotId,ctx.id);
        const { kenkoScore , bmi } = userData ;
        const dummyUserTestResp : any = {
            userHubspotId:userHubspotId?userHubspotId:null ,
            userId:userId ? userId:null ,
            kenkoScore: kenkoScore ?  kenkoScore: null ,
            bmi: bmi? bmi: null ,
            isActive : false ,
            pendingTestId : null as any,
            diagnosticResults : diagnosticResultsDefaultResponse,
            testResults : [],
            digitisationStatus : DigitisationStatusEnum.REJECTED_BY_QA ,
            testType
        }
        this.logService.info(ctx,`returning dummyUserTestResp =>`,dummyUserTestResp);
        return dummyUserTestResp;
    }catch(err){
        this.helperErrorHandler.notificationService(err,ctx,"returnDefaultUserTestResponse  (method) TestsService (service)",true,findOneCriteria)
}
    }


    async fetchTestForQa(query,ctxId){
        try{

        this.logService.info(ctxId,`inside try block of fetchUserTest  (method) TestsService (service) =>`,query);
        const findOneCriteria = await this.validateOnlyOneExistInFetchUserTest(query,ctxId);
        this.logService.info(ctxId,`findOneCriteria =>`,findOneCriteria);
        const userTest = await this.testsDao.pendingTest(findOneCriteria)
        if(process.env.NODE_ENV==="prod"){
            const { ticketId = "" } = userTest;
            this.logService.info(ctxId,`Updating custom object stage to ${HubspotStatusEventsIdsEnum.QA_STARTED}`)
            await this.producer.sendDigitizationEvent(ctxId,QueueEventEnum.UPDATE_CUSTOM_OBJECTID_STATUS,"QUEUE_HUBSPOT_DIGITIZATION",{ticketId,status:"QA_STARTED"})
        }   
        return userTest;
    }catch(err){
        this.helperErrorHandler.notificationService(err,ctxId,"fetchUserTest  (method) TestsService (service)",true,query);
        throw new HttpException('Invalid input ' + err, HttpStatus.BAD_REQUEST);
    }
    }

    async testResults(query,ctxId){

    try{
        this.logService.info(ctxId,`inside try block of testResults  (method) TestsService (service) =>`,query);
        const {hubspotId}=query
        // ----------------------------*****************get markers of the test and calculate diagnostic result here****************************-------------
        const userTest = await this.testsDao.pendingTest({userHubspotId:hubspotId,validity:"PARTIAL"})
        if (!userTest) {
            this.logService.info(ctxId,`UserTest not found ! , Returning dummy response !`)
            const dummyResp = await this.returnDefaultUserTestResponse({hubspotId},ctxId);
            return dummyResp;
        }

        const {id:testId,testType}=userTest


        const diagnosticResults= await this.diagnosisDao.getTestResults({testId})

        return diagnosticResults
    }catch(err){
        this.helperErrorHandler.notificationService(err,ctxId,"testResults  (method) TestsService (service)",true,query);
        throw new HttpException('Invalid input ' + err, HttpStatus.BAD_REQUEST);
    }
    }

    async markTestInvalid(body: any, ctxId: string) {
        const { userDetails, id } = body;
        // const { userEmail } = decoded;
        try {
            this.logService.info(ctxId,`inside try block of markTestInvalid  (method) TestsService (service) =>`,body);

            //in future we need to implement that decode authentication  for testing purpose we have comment it out ..
            // digitisationOwner : userEmail ,
            // digitisedAtTime : new Date(),
            let digitisationStatus = DigitisationStatusEnum.INVALID
            const result = await this.testsDao.updatePendingTestById(id, digitisationStatus)
        }
        catch (err) {
            this.helperErrorHandler.notificationService(err,ctxId,"markTestInvalid  (method) TestsService (service)",true,body);
            throw new HttpException('Invalid input ' + err, HttpStatus.BAD_REQUEST);
        }

    }
    
 

    
}