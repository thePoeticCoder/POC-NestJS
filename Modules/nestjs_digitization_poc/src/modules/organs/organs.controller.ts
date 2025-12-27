import { Body, Controller,Patch, Post, Query,Get } from '@nestjs/common';
import { OrgansService } from './organs.service';
import { createOrganDtO, updateOrganDtO } from 'src/dto/organs.dto';
import { CtxId } from 'src/common/decorators/ctxId.decorator';
import { ApiResponse } from 'src/interfaces/apiResponse';
import { MiscCode, MiscMessages } from 'src/constants/appConstants';
  @Controller('organ')
  export class OrgansController {
    constructor(private readonly organsService: OrgansService) { }
      @Post('create')
        async createOrgans( @Body()  organ:createOrganDtO,@CtxId() ctxId : string ){
          const res= await this.organsService.createOrgan(organ,ctxId);
          return new ApiResponse(res,ctxId,MiscMessages.SUCCESS,MiscCode.SUCCESS)
        }
      @Get('getAll')
        async getOrgans(@CtxId() ctxId : string, @Body()  organIds:any ){
          const res= await this.organsService.getOrgan(ctxId,organIds);
          return new ApiResponse(res,ctxId,MiscMessages.SUCCESS,MiscCode.SUCCESS)
        }
        @Get('get/:id')
        async getOrganById(@Query() params:any,@CtxId() ctxId : string ){
          let id1 =params.id
          const res= await this.organsService.getOrganById(id1,ctxId);
          return new ApiResponse(res,ctxId,MiscMessages.SUCCESS,MiscCode.SUCCESS);
        }
        @Patch('update')
          async updateOrgan (@Query() params:any, @Body()  organ:updateOrganDtO,@CtxId() ctxId : string ){
            let id =params.id;
            const res =  await this.organsService.updateOrgan(id,organ,ctxId);
            return new ApiResponse(res,ctxId,MiscMessages.SUCCESS,MiscCode.SUCCESS);
    }
}