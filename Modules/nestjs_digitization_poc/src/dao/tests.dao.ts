import { Injectable,Inject } from "@nestjs/common";
import { helperErrorHandlerService } from "src/common/services/errorHandlerHelper.service";
import { PrismaService } from "../prisma/prisma.service";
import {TestsQueryParams,SortCriteria,SampleMetaData,MetaData,PendingTest,TestResults} from "../dto/tests.dto"
import {DigitisationStatusEnum} from "../constants/appConstants"
import {searchCriteriaDaoType,PendingTestType,ValidityType,TicketIdType,TestStatus,Owners,digitisedTestType} from "../types/tests.types"
@Injectable()
export class TestsDao{

    @Inject(PrismaService)
    private prisma: PrismaService;
    
    @Inject()
    private helperErrorHandler:helperErrorHandlerService;

async tests(criteria:searchCriteriaDaoType,query?:TestsQueryParams,sortCriteria?:SortCriteria){
    try{
   const {sortField="createdAt",sortType}=sortCriteria
    const {page=1,limit=10,flag=0}=query
    const skipValue=(page-1) ? (page-1)*10-flag:(page-1)*limit
    return await this.prisma.tests.findMany({
        where:criteria,
        take:Number(limit),
        skip:skipValue,
        orderBy:{[sortField]:sortType},
    })
    
}catch(err){
            this.helperErrorHandler.throwErrorAndException(err,"tests");
    }

}

async countTests(criteria:searchCriteriaDaoType){
    try{
    return await this.prisma.tests.count({
        where:criteria,
    })    
 }catch(err){
            this.helperErrorHandler.throwErrorAndException(err,"countTests");
        }
}

// varable name requires to be change-->function is using for pending test and for digitised test  
async pendingTest(criteria: PendingTestType | digitisedTestType ){
    try{
    return await this.prisma.tests.findUnique({
        where:criteria,
    })  
}catch(err){
           this.helperErrorHandler.throwErrorAndException(err,"pendingTest");
        }
}

async updateManyTests(findCriteria:PendingTestType,updateCriteria:  Owners |TestStatus| TicketIdType| ValidityType ){    
    try{
        return await this.prisma.tests.updateMany({
        where:findCriteria,
        data:updateCriteria,
    })        
    }catch(err){
            this.helperErrorHandler.throwErrorAndException(err,"updateManyTests");
        }
}

async createTest(toMakePendingTest:PendingTest,userDetials:any,ingestedUserTestEntries:TestResults[],sampleMetaData:SampleMetaData[]){
    try{

      return this.prisma.$transaction(async ()=>{
        const createdUserDetials=await this.prisma.userDetials.create({data:userDetials})
        const {id}=createdUserDetials
        toMakePendingTest.userId=id
        const createdPendingTestResponse=await this.prisma.tests.create
        ({data:toMakePendingTest})

        const {id:pendingTestId}= createdPendingTestResponse
        const updatedIngestedUserestEntries=ingestedUserTestEntries.map((test)=>({...test,testId:pendingTestId}))
        const updatedMetaData:MetaData[]=[...sampleMetaData].map((metaData:MetaData)=>{
            metaData.metaDataId=metaData.id
            delete metaData["id"]
            metaData.testId=pendingTestId
          return metaData
        })
        try{

        await this.prisma.userMarkers.createMany({data:updatedIngestedUserestEntries})
            
        }catch(err){
         this.helperErrorHandler.throwErrorAndException(err,"createTest");
        }

        const createdMetaDataResponse=await this.prisma.testMetaData.createMany({data:updatedMetaData})
        return createdMetaDataResponse;

      })
    }catch(err){
            this.helperErrorHandler.throwErrorAndException(err,"createTest");
        }
}

async updatePendingTestById ( id : string , digitisationStatus: DigitisationStatusEnum ) {
 try{
 return await this.prisma.tests.update({
  where:{
    id
  },data:{
    digitisationStatus
    }
})
 }catch(err){
            this.helperErrorHandler.throwErrorAndException(err,"updatePendingTestById");
    }
}
}