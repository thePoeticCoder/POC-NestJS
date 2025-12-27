
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { OrgansDao } from 'src/dao/organs.dao';
import { ErrorHandlerService } from '../../common/services/errorHandler.service';
import { CtxId } from 'src/common/decorators/ctxId.decorator';
import { LogService } from 'src/common/services/log.service';
import { helperErrorHandlerService } from 'src/common/services/errorHandlerHelper.service';
import { createOrganDtO, getAllOrganDto, updateOrganDtO } from 'src/dto/organs.dto';
@Injectable()
export class OrgansService {
    @Inject(OrgansDao)
    private OrgansDao:OrgansDao;
    @Inject()
    private helperErrorHandler:helperErrorHandlerService;
    @Inject()
    private logService:LogService
        async createOrgan(organsData:createOrganDtO,@CtxId() ctxId : string){
            try{
                this.logService.info(ctxId,` inside try block of createorgan (method) OrgansService (service) =>`,organsData);
                return await this.OrgansDao.createOrgans(organsData);
            }catch(err){
            this.helperErrorHandler.notificationService(err,ctxId,"createorgan (method) OrgansService (service)",true,organsData);
            throw new HttpException('Invalid input ' + err, HttpStatus.BAD_REQUEST);
            }
        }
        async getOrgan(ctxId : string,ids:any){
            try{
                this.logService.info(ctxId,` inside try block of getOrgan (method) OrgansService (service) =>`,ids);
                return await this.OrgansDao.getOrgans(ids);
            }catch(err){
                this.helperErrorHandler.notificationService(err,ctxId,"getOrgan (method) OrgansService (service)",true,ids);
                throw new HttpException('Invalid input ' + err, HttpStatus.BAD_REQUEST);
            }
        }
        async getOrganById(id:string,ctxId : string){
            try{
                this.logService.info(ctxId,` inside try block of getOrganId (method) OrgansService (service) =>`,id);
                return await this.OrgansDao.getOrganById(id);
            }catch(err){
                this.helperErrorHandler.notificationService(err,ctxId,"getOrganById (method) OrgansService (service)",true,id);
                throw new HttpException('Invalid input ' + err, HttpStatus.BAD_REQUEST);
            }
        }
        async updateOrgan(id:string,data:updateOrganDtO ,@CtxId() ctxId : string){
            try{
                this.logService.info(ctxId,` inside try block of updateOrganMarker (method) OrgansService (service) =>`,data);
                return await this.OrgansDao.updateOrgan(id,data);
            }catch(err){
                this.helperErrorHandler.notificationService(err,ctxId,"updateOrgan (method) OrgansService (service) ",true,data);
                throw new HttpException('Invalid input ' + err, HttpStatus.BAD_REQUEST);
        }
}
}