import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { helperErrorHandlerService } from 'src/common/services/errorHandlerHelper.service';
import { createRequiredMarkerDto } from 'src/dto/requiredMarkers.dto';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class RequiredOrganMarkerDao{
    @Inject(PrismaService)
  private prisma: PrismaService;

  @Inject()
  private helperErrorHandler:helperErrorHandlerService;

    async createRequiredOrganMarker(data:any) {
    try {
      return await this.prisma.$transaction(async function (prisma) {
      
        let isMarkerExist = await prisma.requiredMarkers.findFirst({where:{markerName:data.markerName}})
        if (!isMarkerExist) {
          let organId=data.organId
          delete data.organId
          
        const createdMarker=await prisma.requiredMarkers.create({data})
        const markerId=createdMarker.id;
        
        let organMarkerDetails={
          organId,
          markerId
        };

        prisma.organMarkers.create({
          data:organMarkerDetails 
        })
        return {markerId}
      }
        
    });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientValidationError) {
  
        throw new Error(err.message)
      }

      if (err instanceof Prisma.PrismaClientKnownRequestError) {
  
        throw new Error(err.meta.target.toString())
        
      }
        return err;
    }
  }

  async createRequiredMarker(marker:any) {
    try{
    return await this.prisma.requiredMarkers.create({
        data: marker
    })
  }catch(err){
           this.helperErrorHandler.throwErrorAndException(err,"createRequiredMarker");
        }
}

async getMarker(params) {
  try{
    return await this.prisma.requiredMarkers.findMany({where:{markerName:{in:params.markerName}}})
  }catch(err){
            this.helperErrorHandler.throwErrorAndException(err,"getMarker");
        }
}
async getMarkerById(id:string) {
  try{
    const requiredMarker =  await this.prisma.requiredMarkers.findUnique({
        where: {
          id: id,
        },
      });
      return requiredMarker;
    }catch(err){
            this.helperErrorHandler.throwErrorAndException(err,"getMarkerById");
        }
}
async updateMarker(id:string,updatedData:createRequiredMarkerDto){
  try{
    const existMarker=await this.prisma.requiredMarkers.findUnique({
        where:{
            id
        }
    });

    if(!existMarker){
        return "marker doesnt exist";
    }

    return await this.prisma.requiredMarkers.update({
        where:{
            id
        },data:{
            ...updatedData
        }
    })
  }catch(err){
     this.helperErrorHandler.throwErrorAndException(err,"updateMarker");
    }
}

async list(criteria:string){
  try{

    return await this.prisma.$transaction(async ()=>{
      const testTypeRes=await this.prisma.testType.findUnique({where:{testType:criteria}})
      const {id:testTypeId}=testTypeRes
      const markersResponse= await this.prisma.requiredMarkers.findMany({where:{testTypeId}})
      for (let i=0; i<markersResponse.length; i++){
        let markerid=markersResponse[i].id;
        let organ= await this.prisma.organMarkers.findFirst({where:{markerId:markerid}});
        markersResponse[i]["organId"]=organ.organId;
      return markersResponse
      }
    });
  }
    catch(err){
         this.helperErrorHandler.throwErrorAndException(err,"list");
        }
}


async getMarkersDetials(pendingTestId:string){
  try{
    const result = await this.prisma.$queryRaw(Prisma.sql`SELECT * FROM public."RequiredMarkers"
    INNER JOIN public."UserMarkers" ON "UserMarkers"."markerId" = "RequiredMarkers".id
    WHERE public."UserMarkers"."testId"=${pendingTestId} AND  public."UserMarkers"."isActive"=true`)

    return [...<[]>result]


  }catch(err){
          this.helperErrorHandler.throwErrorAndException(err,"getMarkersDetials");
        }
}

async searchDynamicMarkers(req:string){
  try{
  return   await this.prisma.requiredMarkers.findMany({
      where:{
      markerName: {
      contains: req,
    }
  },select: {
    markerName: true,
  }
  });
}catch(err){
            this.helperErrorHandler.throwErrorAndException(err,"SearchInDynamicMarker");
        }
}

async getMarkerByName(markerName:string){
  try{
  const res=await this.prisma.requiredMarkers.count({
    where:{
      markerName
    }
  })
  if(res==0){
  return false ;
  }
  return true;
  }catch(err){
            this.helperErrorHandler.throwErrorAndException(err,"getMarkerByName");
        }
}

}