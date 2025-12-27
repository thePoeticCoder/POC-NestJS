import { TestMetaDataService } from './testMetaData.service';
import { Body, Controller, Get, Inject, Patch, Post, Query } from '@nestjs/common';
import { CtxId } from 'src/common/decorators/ctxId.decorator';
import { ApiResponse } from 'src/providers/api-response';
import { MiscCode, MiscMessages } from 'src/constants/appConstants';
@Controller('test-meta-data')
export class TestMetaDataController {
    constructor(public readonly testMetaDataService:TestMetaDataService){}
    @Get('getAll')
    async getTestMetaData(@CtxId() ctxId : string){
      let res= await this.testMetaDataService.getTestMetaData(ctxId);
      return new ApiResponse(res,ctxId,MiscMessages.SUCCESS,MiscCode.SUCCESS);
    }
}