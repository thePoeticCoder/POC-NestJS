import { Inject, Injectable } from '@nestjs/common';
import { helperErrorHandlerService } from 'src/common/services/errorHandlerHelper.service';
import { createOrganDtO, getAllOrganDto, updateOrganDtO } from 'src/dto/organs.dto';

import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class OrgansDao {
    @Inject(PrismaService)
    private prisma: PrismaService;

    @Inject()
    private helperErrorHandler:helperErrorHandlerService;
    async createOrgans(organ:createOrganDtO) {

    try{

        return await this.prisma.organs.create({
            data: organ
        })
    }catch(err){
            this.helperErrorHandler.throwErrorAndException(err,"createOrgans");
        }
    }
    
  // duplicate need to be remove
  async getAllOrgans() {
    try{
    return await this.prisma.organs.findMany()
    }catch(err){
            this.helperErrorHandler.throwErrorAndException(err,"getAllOrgans");
        }
  }
    
    async getOrgans(criteria) {
        
        try{
            if(Object.keys(criteria).length){
                return await this.prisma.organs.findMany({where:{id:{in:criteria}}})
                }
            else{
                return await this.prisma.organs.findMany()
            }

        }catch(err){
                this.helperErrorHandler.throwErrorAndException(err,"getOrgans");
        }
    }
    
    async getOrganById(id:string) {
        try{
        const organData =  await this.prisma.organs.findUnique({
            where: {
                id: id,
            },
            });
            return organData;
        }catch(err){
            this.helperErrorHandler.throwErrorAndException(err,"getOrganById");
        }
    }

    async updateOrgan(id:string,updatedData:updateOrganDtO){
        try{
        const existOrgan=await this.prisma.organs.findUnique({
            where:{
                id
            }
        });

        if(!existOrgan){
            return "organ doesn't exist";
        }
        else {

        return await this.prisma.organs.update({
            where:{
                id
            },data:{
                ...updatedData
            }
        })
    }
    }catch(err){
                this.helperErrorHandler.throwErrorAndException(err,"updateOrgan");
        }
    }

    async getOrganIdByName(organName:string){
        try{
        let res= await this.prisma.organs.findUnique({
            where:{
            organName
            }
        });
        return res.id
  
      }catch(err){
                this.helperErrorHandler.throwErrorAndException(err,"getOrganIdByName");
        }
    }

}