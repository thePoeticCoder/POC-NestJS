import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { helperErrorHandlerService } from 'src/common/services/errorHandlerHelper.service';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class DiagnosisDao {
    @Inject(PrismaService)
    private prisma: PrismaService;
    @Inject()
    private helperErrorHandler:helperErrorHandlerService;
    
    
    async diagnosisResults(data,pendingTestId) {
        try{
            return await this.prisma.$transaction(async ()=>{
                const updatedData=data.map((eachData)=> ({...eachData,testId:pendingTestId}))
                const statusChangeRes=await this.prisma.diagnosis.updateMany({where:{testId:pendingTestId},data:{isActive:false}})
                const testTypeResponse =  await this.prisma.diagnosis.createMany({data:updatedData});
                return testTypeResponse;
            })
        }catch(err){
            this.helperErrorHandler.throwErrorAndException(err,"diagnosisResults");
        }
    }

    async getTestResults(criteria){
        try{
        const testResultsRes=await this.prisma.diagnosis.findMany({where:criteria})
        return testResultsRes
        }catch(err){
            this.helperErrorHandler.throwErrorAndException(err,"getTestResults");
        }

    }


}