import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { requiredMetaDataDao } from 'src/dao/requiredMetaData.dao';
import { LogService } from 'src/common/services/log.service';
import { helperErrorHandlerService } from 'src/common/services/errorHandlerHelper.service';
import { createMetaDataDto } from 'src/dto/requiredMetaData.dto';
@Injectable()
export class MetaDataService {
    @Inject(requiredMetaDataDao)
    private metaDataDao:requiredMetaDataDao;
    @Inject()
    private logService:LogService;
    @Inject()
    private helperErrorHandler:helperErrorHandlerService;
        async createMetaData(metaData:createMetaDataDto, ctxId : string){
            try{
                this.logService.info(ctxId,`inside try block of createMetaData (method) MetaDataService (service) =>`,metaData);
                return await this.metaDataDao.createMetaData(metaData)
            }catch(err){
                this.helperErrorHandler.notificationService(err,ctxId,"createMetaData (method) MetaDataService (service)",true,metaData);
                throw new HttpException('Invalid input ' + err, HttpStatus.BAD_REQUEST);
            }
    }
        async getMetaData(ctxId : string){
            try{
                this.logService.info(ctxId,`inside try block of getMetaData (method) MetaDataService (service) =>`);
                return await this.metaDataDao.getMetaData();
            }catch(err){
                this.helperErrorHandler.notificationService(err,ctxId,"getMetaData (method) MetaDataService (service)",true,"");
                throw new HttpException('Invalid input ' + err, HttpStatus.BAD_REQUEST);
            }
        }
        async getMetaDataById(id:string,ctxId : string){
            try{
                this.logService.info(ctxId,`inside try block of getMetaDataById (method) MetaDataService (service) =>`,id);
                return await this.metaDataDao.getMetaDataByID(id);
            }catch(err){
                this.helperErrorHandler.notificationService(err,ctxId,"getMetaDataById (method) MetaDataService (service)",true,id);
                throw new HttpException('Invalid input ' + err, HttpStatus.BAD_REQUEST);
            }
            }
            async updateMetaData(id:string,data:createMetaDataDto,ctxId : string){
                try{
                    this.logService.info(ctxId,`inside try block of updateMetaData (method) MetaDataService (service) =>`,data);
                    return await this.metaDataDao.updateMetaData(id,data);
                }catch(err){
                    this.helperErrorHandler.notificationService(err,ctxId,"updateMetaData (method) MetaDataService (service)",true,data);
                    throw new HttpException('Invalid input ' + err, HttpStatus.BAD_REQUEST);
                }
            }
}