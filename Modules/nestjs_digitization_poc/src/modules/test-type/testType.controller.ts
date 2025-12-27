import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import {  createtestTypeDto } from 'src/dto/testType.dto';
import { TestTypeService } from './testType.service';
import { CtxId } from 'src/common/decorators/ctxId.decorator';
import { ApiResponse } from 'src/providers/api-response';
import { MiscCode, MiscMessages } from 'src/constants/appConstants';
// import { ApiResponse } from '@kenko-health/shared';
@Controller('testType')
export class TestTypeController {
    constructor(private readonly TestTypeService:TestTypeService){}
    @Post('create')
    async createTestType(@Body() testtype:createtestTypeDto,@CtxId() ctxId : string ){
        let res= await this.TestTypeService.createTestType(testtype,ctxId);
        return new ApiResponse(res,ctxId,MiscMessages.SUCCESS,MiscCode.SUCCESS);
    }
    @Get('getAll')
    async getTestType( @CtxId() ctxId : string){
      let res= await this.TestTypeService.getTestType(ctxId);
      return new ApiResponse(res,ctxId,MiscMessages.SUCCESS,MiscCode.SUCCESS);
    }
    @Get('get/:id')
    async getTestTypeBYId(@Query() params:any,@CtxId() ctxId : string){
      let id =(params.id)
      let res= await this.TestTypeService.getTestTypeById(id,ctxId);
      return new ApiResponse(res,ctxId,MiscMessages.SUCCESS,MiscCode.SUCCESS);
    }
    @Patch('update')
      async update (@Query() params:any, @Body()testType:createtestTypeDto,@CtxId() ctxId : string){
        let id =params.id;
        let res= await this.TestTypeService.updateTestType(id,testType,ctxId);
        return new ApiResponse(res,ctxId,MiscMessages.SUCCESS,MiscCode.SUCCESS);
      }
}