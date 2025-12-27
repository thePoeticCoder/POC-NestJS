import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { CtxId } from 'src/common/decorators/ctxId.decorator';
import { MiscCode, MiscMessages } from 'src/constants/appConstants';
import { createRequiredMarkerDto } from 'src/dto/requiredMarkers.dto';
import { ApiResponse } from 'src/providers/api-response';
import { RequiredMarkerService } from './requiredMarker.service';
@Controller('requiredMarker')
export class RequiredMarkerController {
      constructor(private readonly  RequiredMarkerService:RequiredMarkerService) { }
      @Post('create')
      async createRequiredMarker(@Body() marker:createRequiredMarkerDto,@CtxId() ctxId : string){
         let res= await this.RequiredMarkerService.createRequiredOrganMarker(marker,ctxId);
         return new ApiResponse(res,ctxId,MiscMessages.SUCCESS,MiscCode.SUCCESS);
      }
      @Get('getAll')
      async getRequiredMarker(@Body() params:any,@CtxId() ctxId : string){
         let res= await this.RequiredMarkerService.getRequiredMarker(params,ctxId);
         return new ApiResponse(res,ctxId,MiscMessages.SUCCESS,MiscCode.SUCCESS);
      }
      @Get('get/:id')
      async getRequiredMarkerById(@Query() params:any,@CtxId() ctxId : string)
      {
         let id1 =(params.id)
         let res= await this.RequiredMarkerService.getRequiredMarkerById(id1,ctxId);
         return new ApiResponse(res,ctxId,MiscMessages.SUCCESS,MiscCode.SUCCESS);
      }
      @Patch('update')
      async updateMarker (id:string, @Body()  marker:createRequiredMarkerDto,@CtxId() ctxId : string){
         let res= await this.RequiredMarkerService.updateMarker(id,marker,ctxId);
         return new ApiResponse(res,ctxId,MiscMessages.SUCCESS,MiscCode.SUCCESS);
      }
      @Get('SearchInDynamicMarker')
      async SearchInDynamicMarker(@Query() params:any,@CtxId() ctxId : string){
         let {req}=params;
         let res= await this.RequiredMarkerService.searchDynamicMarkers(req,ctxId);
         return new ApiResponse(res,ctxId,"Success",200);
      }
}