import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { createRequiredMarkerDto } from 'src/dto/requiredMarkers.dto';
import { RequiredOrganMarkerDao } from 'src/dao/requiredOrganMarker.dao';
import { LogService } from 'src/common/services/log.service';
import { CtxId } from 'src/common/decorators/ctxId.decorator';
import { helperErrorHandlerService } from 'src/common/services/errorHandlerHelper.service';
@Injectable()
export class RequiredMarkerService {
    @Inject()
    private requiredOrganMarkerDao:RequiredOrganMarkerDao;

    @Inject()
    private helperErrorHandler:helperErrorHandlerService;

    @Inject()
    private logService:LogService;

    async createRequiredMarker(requiredmarker:any,@CtxId() ctxId : string){
        try{
            this.logService.info(ctxId,`inside try block of createRequiredMarker (method) RequiredMarkerService (service) =>`,requiredmarker);
            return await this.requiredOrganMarkerDao.createRequiredMarker(requiredmarker);
        }catch(err)
        {
            this.helperErrorHandler.notificationService(err,ctxId,"createRequiredMarker (method) RequiredMarkerService (service) ",true,requiredmarker);
            throw new HttpException('Invalid input ' + err, HttpStatus.BAD_REQUEST);
        }
    }
    async getRequiredMarker(params:any,@CtxId() ctxId : string){
        try{
        this.logService.info(ctxId,`inside try block of getRequiredMarker (method) RequiredMarkerService (service) =>`,params);
        return await this.requiredOrganMarkerDao.getMarker(params);
        }catch(err){
            this.helperErrorHandler.notificationService(err,ctxId,"createRequiredMarker (method) RequiredMarkerService (service)",true,params);
            throw new HttpException('Invalid input ' + err, HttpStatus.BAD_REQUEST);
        }
    }
    async getRequiredMarkerById(id:string,@CtxId() ctxId : string){
        try{
        this.logService.info(ctxId,`inside try block of getRequiredMarkerById (method) RequiredMarkerService (service) =>`,id);
        return await this.requiredOrganMarkerDao.getMarkerById(id);
        }catch(err){
            this.helperErrorHandler.notificationService(err,ctxId,"createRequiredMarker (method) RequiredMarkerService (service)",true,id);
            throw new HttpException('Invalid input ' + err, HttpStatus.BAD_REQUEST);
        }
    }
    async updateMarker(id:string,data:createRequiredMarkerDto,@CtxId() ctxId : string){
        try{
        this.logService.info(ctxId,`inside try block of updateMarker (method) RequiredMarkerService (service) =>`,data);
        return await this.requiredOrganMarkerDao.updateMarker(id,data);
        }catch(err){
            this.helperErrorHandler.notificationService(err,ctxId,"createRequiredMarker (method) RequiredMarkerService (service)",true,data);
            throw new HttpException('Invalid input ' + err, HttpStatus.BAD_REQUEST);
        }
    }
    async createRequiredOrganMarker(data:any,@CtxId() ctxId : string){
            try{
                this.logService.info(ctxId,`inside try block of createRequiredOrganMarker (method) RequiredMarkerService (service) =>`,data);
                return await this.requiredOrganMarkerDao.createRequiredOrganMarker(data);
            }
            catch(err){
                this.helperErrorHandler.notificationService(err,ctxId,"createRequiredMarker (method) RequiredMarkerService (service)",true,data);
                throw new HttpException('Invalid input ' + err, HttpStatus.BAD_REQUEST);
            }
    }
    async searchDynamicMarkers(req:string,ctxId : string){
        try{
            this.logService.info(ctxId,`inside try block of SearchInDynamicMarker (method) RequiredMarkerService  (service) =>`,req);
        return await this.requiredOrganMarkerDao.searchDynamicMarkers(req);
        }catch(err)
        {
            this.helperErrorHandler.notificationService(err,ctxId,"SearchInDynamicMarker (method) RequiredMarkerService (service) ",true,req)
        }
    }
}