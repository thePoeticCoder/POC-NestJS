import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CtxId } from 'src/common/decorators/ctxId.decorator';
import { ErrorHandlerService } from 'src/common/services/errorHandler.service';
import { helperErrorHandlerService } from 'src/common/services/errorHandlerHelper.service';
import { LogService } from 'src/common/services/log.service';
import { TestTypeDao } from 'src/dao/testType.dao';
import { createtestTypeDto } from 'src/dto/testType.dto';
@Injectable()
export class TestTypeService {
    @Inject(TestTypeDao)
    private testTypeDao:TestTypeDao;
    @Inject()
    private logService:LogService;
    @Inject()
    private helperErrorHandler:helperErrorHandlerService;
    async  createTestType(testTypeData:createtestTypeDto,@CtxId() ctxId : string){
        try{
            this.logService.info(ctxId,`inside try block of createTestType (method) TestTypeService (service) =>`,testTypeData);
            return await this.testTypeDao.createTestType(testTypeData);
    }catch(err){
        this.helperErrorHandler.notificationService(err,ctxId,"createTestType (method) TestTypeService (service)",true,testTypeData);
        throw new HttpException('Invalid input ' + err, HttpStatus.BAD_REQUEST);
    }
    }
    async getTestType(@CtxId() ctxId : string){
        try{
            this.logService.info(ctxId,`inside try block of getTestType (method) TestTypeService (service) =>`,"");
            return await this.testTypeDao.getTestType();
        }catch(err){
            this.helperErrorHandler.notificationService(err,ctxId,"getTestType (method) TestTypeService (service)",true,"");
            throw new HttpException('Invalid input ' + err, HttpStatus.BAD_REQUEST);
        }
    }
    async getTestTypeById(id:string,@CtxId() ctxId : string){
        try{
            this.logService.info(ctxId,`inside try block of getTestTypeById (method) TestTypeService (service) =>`,"");
            return await this.testTypeDao.gettestTypeById(id);
        }catch(err){
            this.helperErrorHandler.notificationService(err,ctxId,"getTestTypeById (method) TestTypeService (service)",true,"");
            throw new HttpException('Invalid input ' + err, HttpStatus.BAD_REQUEST);
        }
    }
    async updateTestType(id:string,data:any,@CtxId() ctxId : string){
        try{
            this.logService.info(ctxId,`inside try block of updateTestType (method) TestTypeService (service) =>`,data);
            return await this.testTypeDao.updateTestType(id,data);
        }catch(err){
            this.helperErrorHandler.notificationService(err,ctxId,"updateTestType (method) TestTypeService (service)",true,data);
            throw new HttpException('Invalid input ' + err, HttpStatus.BAD_REQUEST);
        }
    }
}