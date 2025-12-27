import { Inject, Injectable } from '@nestjs/common';
import { helperErrorHandlerService } from 'src/common/services/errorHandlerHelper.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MetaDataDao {
    @Inject(PrismaService)
    private prisma: PrismaService;

    @Inject()
    private helperErrorHandler:helperErrorHandlerService;
    
    async findMetaData() {
        try{
            const testTypeResponse =  await this.prisma.metaData.findMany();
            return testTypeResponse;
        }catch(err){
            this.helperErrorHandler.throwErrorAndException(err,"findMetaData");
        }
       
    }


}