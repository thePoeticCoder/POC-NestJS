import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CtxId } from 'src/common/decorators/ctxId.decorator';
import { ErrorHandlerService } from 'src/common/services/errorHandler.service';
import { LogService } from 'src/common/services/log.service';
import { OrganMarkerDao } from 'src/dao/organMarker.dao';
import { helperErrorHandlerService } from 'src/common/services/errorHandlerHelper.service';
import { createOrganMarkerDtO } from 'src/dto/organMarker.dto';
@Injectable()
export class OrganMarkerService {
    @Inject(OrganMarkerDao)
    private organmarkerDao:OrganMarkerDao;
    @Inject()
    private helperErrorHandler:helperErrorHandlerService;
    @Inject()
    private logService:LogService;
    async createOrganMarker(organMarker:createOrganMarkerDtO,@CtxId() ctxId : string){
        try{
            this.logService.info(ctxId,`inside try block of createOrganMarker (method)  OrganMarkerService (service) =>`,organMarker);
            return  await this.organmarkerDao.createOrganMarker(organMarker);
            
        }
        catch(err){
                this.helperErrorHandler.notificationService(err,ctxId,"createOrganMarker (method) OrganMarkerService  (service)",true,organMarker)
                throw new HttpException('Invalid input ' + err, HttpStatus.BAD_REQUEST);
            }
}
    async getOrganMarker(params:any,@CtxId() ctxId : string){
        try{
            this.logService.info(ctxId,`inside try block of getOrganMarker (method)  OrganMarkerService (service) =>`,params);
            return await this.organmarkerDao.getOrganMarker();
        }catch(err){
                this.helperErrorHandler.notificationService(err,ctxId,"getOrganMarker (method)  OrganMarkerService (service)",true,params)
                throw new HttpException('Invalid input ' + err, HttpStatus.BAD_REQUEST);
        }
    }
    async getOrganMarkerById(id:string,@CtxId() ctxId : string){
        try{
            this.logService.info(ctxId,`inside try block of getOrganMarkerById (method)  OrganMarkerService (service) =>`,id);
            return await this.organmarkerDao.getOrganMarkerByID(id);
            
        }catch(err){
            this.helperErrorHandler.notificationService(err,ctxId,"getOrganMarkerById (method)  OrganMarkerService (service)",true,id)
            throw new HttpException('Invalid input ' + err, HttpStatus.BAD_REQUEST);
        }
        }
}