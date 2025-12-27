import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { helperErrorHandlerService } from 'src/common/services/errorHandlerHelper.service';
import { createtestTypeDto } from 'src/dto/testType.dto';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class TestTypeDao {
    @Inject(PrismaService)
    private prisma: PrismaService;

    @Inject()
    private helperErrorHandler:helperErrorHandlerService;
    
    async createTestType(testType:any) {
      try{
        return await this.prisma.testType.create({
            data: testType
        })
      }catch(err){
            this.helperErrorHandler.throwErrorAndException(err,"createTestType");
        }
    }
    
    async getTestType() {
      try{
        return await this.prisma.testType.findMany()
      }catch(err){
            this.helperErrorHandler.throwErrorAndException(err,"getTestType"); 
        }
    }
    
    async gettestTypeById(id:string) {
      try{
        const testTypeById =  await this.prisma.testType.findUnique({
            where: {
              id: id,
            },
          });
          return testTypeById;
        }catch(err){
            this.helperErrorHandler.throwErrorAndException(err,"gettestTypeById");
        }

    }

    async updateTestType(id:string,updatedData:createtestTypeDto){
      try{
        const testTypeById =  await this.prisma.testType.findUnique({
            where: {
              id: id,
            },
          });
          if(!testTypeById){
            return testTypeById;
          }

          return await this.prisma.testType.update({
            where:{
                id:id
            },data:{
                ...updatedData
            }
          })
        }catch(err){
            this.helperErrorHandler.throwErrorAndException(err,"updateTestType");
        }

    }

    async getTestTypeIdByName (name :string){
      try{
      const testTypeId =  await this.prisma.testType.findUnique({
        where: {
          testType:name ,
        },
      });
      return testTypeId.id
      }catch(err){
            this.helperErrorHandler.throwErrorAndException(err,"createOrganMarker");
        }
    }

}