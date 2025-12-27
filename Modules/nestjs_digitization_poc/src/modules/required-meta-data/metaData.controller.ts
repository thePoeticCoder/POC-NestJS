import { MetaDataService } from './metaData.service';
import { Body, Controller, Inject, Patch, Post, Query } from '@nestjs/common';
import {Get,HttpCode, UsePipes,ValidationPipe,} from '@nestjs/common';
import { createMetaDataDto } from 'src/dto/requiredMetaData.dto';
import { CtxId } from 'src/common/decorators/ctxId.decorator';
import { ApiResponse } from 'src/providers/api-response';
import { MiscCode, MiscMessages } from 'src/constants/appConstants';
@Controller('meta-data')
export class MetaDataController {
    constructor(private readonly metaDataService: MetaDataService) { }
    @Post('create')
    async createMetaData( @Body()  Metadata:createMetaDataDto,@CtxId() ctxId : string ){
    let res = await this.metaDataService.createMetaData(Metadata,ctxId);
    return new ApiResponse(res,ctxId,MiscMessages.SUCCESS,MiscCode.SUCCESS);
    }
    @Get('getAll')
    async getMetaData(@CtxId() ctxId : string){
      let res = await this.metaDataService.getMetaData(ctxId);
      return new ApiResponse(res,ctxId,MiscMessages.SUCCESS,MiscCode.SUCCESS);
    }
    @Get('get/:id')
    async getMetaDataById(@Query() params:any,@CtxId() ctxId : string){
      let id1 =(params.id)
      let res = await this.metaDataService.getMetaDataById(id1,ctxId);
      return new ApiResponse(res,ctxId,MiscMessages.SUCCESS,MiscCode.SUCCESS);
    }
    @Patch('update')
      async updateMetaData (id:string,@CtxId() ctxId : string, @Body()  metaData:createMetaDataDto){
      let res = await this.metaDataService.updateMetaData(id,metaData,ctxId);
      return new ApiResponse(res,ctxId,MiscMessages.SUCCESS,MiscCode.SUCCESS);
}
}
