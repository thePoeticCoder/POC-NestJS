import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { helperErrorHandlerService } from 'src/common/services/errorHandlerHelper.service';
import { PrismaService } from '../prisma/prisma.service';
import {UserMarkers} from "../dto/tests.dto"
@Injectable()
export class UserMarkerDao {
    @Inject(PrismaService)
    private prisma: PrismaService;
    
    @Inject()
    private helperErrorHandler:helperErrorHandlerService;

    async createUserMarker(data:any) {
        try{
        return await this.prisma.userMarkers.createMany({
            data
        })
    }catch(err){
            this.helperErrorHandler.throwErrorAndException(err,"createUserMarker");
        }
    }
    
    async getUserMarker(criteria:UserMarkers) {

        try{
            return await this.prisma.userMarkers.findMany({where:criteria})
            
        }catch(err){
            this.helperErrorHandler.throwErrorAndException(err,"getUserMarker");
        }
        


    }
    
    async getUserMarkerById(id:string) {
        try{
        return  await this.prisma.userMarkers.findUnique({
            where: {
              id,
            }
          });
       }catch(err){
            if (err instanceof Prisma.PrismaClientValidationError) {
            throw new Error(err.message)
            }

            if (err instanceof Prisma.PrismaClientKnownRequestError) {
            throw new Error(err.meta.target.toString())
            }
        return err;
        }
    }

       async updateUserMarkers(data,testId:string){
        try{
            return this.prisma.$transaction(async () => {
            await this.prisma.userMarkers.updateMany({where:{testId},data:{isActive:false}})
            return await this.createUserMarker(data)
            
            })
            
        }catch(err){
            this.helperErrorHandler.throwErrorAndException(err,"updateUserMarkers");
        }
    }

}