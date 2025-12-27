import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { helperErrorHandlerService } from 'src/common/services/errorHandlerHelper.service';
import { PrismaService } from '../prisma/prisma.service';
import { SampleMetaData } from 'src/dto/tests.dto';
@Injectable()
export class requiredMetaDataDao {
    @Inject(PrismaService)
    private prisma: PrismaService;
    
    @Inject()
    private helperErrorHandler:helperErrorHandlerService;
    async createMetaData(metaData:any) {
        try{
        return await this.prisma.metaData.create({
            data: metaData
        })
        }catch(err){
            this.helperErrorHandler.throwErrorAndException(err,"createMetaData");
        }
    }
    
    async getMetaData() {
        try{
        return await this.prisma.metaData.findMany()
        }catch(err){
            this.helperErrorHandler.throwErrorAndException(err,"getMetaData");
        }
    }
    
    async getMetaDataByID(id:string) {
        try{
        const metaData =  await this.prisma.metaData.findUnique({
            where: {
              id: id,
            },
          });
          return metaData;
        }catch(err){
           this.helperErrorHandler.throwErrorAndException(err,"getMetaDataByID");
        }
       
    }
    async updateMetaData(id:string,updatedData:any){
        try{
        const existMarker=await this.prisma.metaData.findUnique({
            where:{
                id
            }
        });

        if(!existMarker){
            return "marker doesnt exist";
        }

        return await this.prisma.metaData.update({
            where:{
                id
            },data:{
                ...updatedData
            }
        })
    }catch(err){
            this.helperErrorHandler.throwErrorAndException(err,"updateMetaData");
        }
    }

}