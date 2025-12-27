import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { helperErrorHandlerService } from 'src/common/services/errorHandlerHelper.service';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class TestMetaDataDao {
    @Inject(PrismaService)
    private prisma: PrismaService;

    @Inject()
    private helperErrorHandler:helperErrorHandlerService;
    
    async createTestMetaData(data:any,pendingTestId) {
        try{
            return this.prisma.$transaction(async ()=>{
                await this.prisma.testMetaData.updateMany({where:{testId:pendingTestId},data:{isActive:false}})
                return await this.prisma.testMetaData.createMany({
                        data
                })  
    
            }) 
        }catch(err){
            this.helperErrorHandler.throwErrorAndException(err,"createTestMetaData");
        }
    }

    async getTestMetaData(criteria:any) {
        try{
        return await this.prisma.testMetaData.findMany({where:criteria})
    }catch(err){
            this.helperErrorHandler.throwErrorAndException(err,"getTestMetaData");
        }
    }

}







