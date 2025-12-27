import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { TestMetaDataDao } from 'src/dao/testMetaData.dao';
import { helperErrorHandlerService } from 'src/common/services/errorHandlerHelper.service';
import { CtxId } from 'src/common/decorators/ctxId.decorator';
import { LogService } from 'src/common/services/log.service';
@Injectable()
export class TestMetaDataService {
    @Inject(TestMetaDataDao)
    private testMetaDataDao:TestMetaDataDao;
    @Inject()
    private helperErrorHandler:helperErrorHandlerService;
    @Inject()
    private logService:LogService
    async getTestMetaData(@CtxId() ctxId : string){
        try{
        this.logService.info(ctxId,`inside try block of updateOrganMarker (method)  TestMetaDataService (service) =>`);
        return  await this.testMetaDataDao.getTestMetaData({});
        }catch(err){
            this.helperErrorHandler.notificationService(err,ctxId,"createOrgan (method)  TestMetaDataService (service)",true,"");
            throw new HttpException('Invalid input ' + err, HttpStatus.BAD_REQUEST);
        }
    }
}