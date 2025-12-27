import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { createOrganMarkerDtO } from 'src/dto/organMarker.dto';
import { helperErrorHandlerService } from 'src/common/services/errorHandlerHelper.service';
@Injectable()
export class OrganMarkerDao {
    @Inject(PrismaService)
    private prisma: PrismaService;

    @Inject()
    private helperErrorHandler:helperErrorHandlerService;
    
    async createOrganMarker(data:createOrganMarkerDtO) {
        try{
        return await this.prisma.organMarkers.create({
            data: data
        })
    }catch(err){
            this.helperErrorHandler.throwErrorAndException(err,"createOrganMarker");
        }
    }
    
    async getOrganMarker() {
        try{
        return await this.prisma.organMarkers.findMany()
        }catch(err){
            this.helperErrorHandler.throwErrorAndException(err,"getOrganMarker");
        }
        
    }

    async getOrganIds(Ids:any){
        try{
            const resp=await this.prisma.organMarkers.findMany({where:{markerId:{in:Ids}},select:{organId:true,markerId:true}})
            return resp

        }catch(err){
            this.helperErrorHandler.throwErrorAndException(err,"getOrganIds");
        }

    }
    
    async getOrganMarkerByID(id:string) {
        try{
        const result =  await this.prisma.organMarkers.findUnique({
            where: {
                id: id,
            },
            });
            return result;
        }catch(err){
            this.helperErrorHandler.throwErrorAndException(err,"getOrganMarkerByID");
        }
    }
}