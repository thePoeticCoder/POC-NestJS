import { Body, Controller, Inject, Patch, Post, Query,Get } from '@nestjs/common';
import { CtxId } from 'src/common/decorators/ctxId.decorator';
import { createOrganMarkerDtO } from 'src/dto/organMarker.dto';
import { ApiResponse } from 'src/providers/api-response';
import { OrganMarkerService } from './organMarker.service';
import { MiscCode, MiscMessages } from 'src/constants/appConstants';
@Controller('organMarker')
export class OrganMarkerController {
    constructor(public readonly organMarkerService: OrganMarkerService) { }
    @Post('create')
    async createOrganMarker( @Body()  organMarker:createOrganMarkerDtO, @CtxId() ctxId : string ){
      let res= await this.organMarkerService.createOrganMarker(organMarker,ctxId);
      return new ApiResponse(res,ctxId,MiscMessages.SUCCESS,MiscCode.SUCCESS)
    }
    @Get('getAll')
    async getOrganMarker(@Query() params:any,@CtxId() ctxId : string){
      let res= await this.organMarkerService.getOrganMarker(params,ctxId);
      return new ApiResponse(res,ctxId,MiscMessages.SUCCESS,MiscCode.SUCCESS)
    }
    @Get('get/:id')
    async getOrganMarkerById(@Query() params:any,@CtxId() ctxId : string){
      let id=params.id
      let res= await this.organMarkerService.getOrganMarkerById(id,ctxId);
      return new ApiResponse(res,ctxId,MiscMessages.SUCCESS,MiscCode.SUCCESS)
  }
}