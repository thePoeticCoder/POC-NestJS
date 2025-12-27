import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { CtxId } from 'src/common/decorators/ctxId.decorator';
import { MiscCode, MiscMessages } from 'src/constants/appConstants';
import { ApiResponse } from 'src/providers/api-response';
import { UserMarkerService } from './userMarker.service';
@Controller('userMarker')
export class UserMarkerController {
    constructor(public readonly userMarkerService:UserMarkerService){}
    @Post('create')
    async createTestType(@Body() data:any,@CtxId() ctxId : string){
        const res= await this.userMarkerService.createUsermarkerData(data,ctxId);
        return new ApiResponse(res,ctxId,MiscMessages.SUCCESS,MiscCode.SUCCESS);
    }
 
    
    @Get('get/:id')
    async getUserMarkerById(@Query() params:any,@CtxId() ctxId : string){
      let id=params.id
      const res= await this.userMarkerService.getUserMarkerById(id,ctxId);
      return new ApiResponse(res,ctxId,MiscMessages.SUCCESS,MiscCode.SUCCESS)
    }
}
