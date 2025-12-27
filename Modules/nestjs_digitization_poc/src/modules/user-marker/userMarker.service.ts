import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { helperErrorHandlerService } from 'src/common/services/errorHandlerHelper.service';
import { LogService } from 'src/common/services/log.service';
import { UserMarkerDao } from 'src/dao/userMarkers.dao';
@Injectable()
export class UserMarkerService {
    @Inject(UserMarkerDao)
    private userMarkerDao:UserMarkerDao;
    @Inject()
    private helperErrorHandler:helperErrorHandlerService;
    @Inject()
    private logService:LogService;
    async  createUsermarkerData(data:any,ctxId:string){
        try{
            this.logService.info(ctxId,`inside try block of createUsermarkerData method UserMarkerService service =>`,data);
            return await this.userMarkerDao.createUserMarker(data);
        }catch(err){
            this.helperErrorHandler.notificationService(err,ctxId,"createUsermarkerData method UserMarkerService service",true,data);
            throw new HttpException('Invalid input ' + err, HttpStatus.BAD_REQUEST);
    }
}
    async getUserMarkerById(id:string,ctxId:string){
        try{
        this.logService.info(ctxId,`inside try block of getUserMarkerById method UserMarkerService service =>`,id);
            return await this.userMarkerDao.getUserMarkerById(id);
        }catch(err){
            this.helperErrorHandler.notificationService(err,ctxId,"getUSerMarker method UserMarkerService service",true,id);
            throw new HttpException('Invalid input ' + err, HttpStatus.BAD_REQUEST);
        }
    }
}