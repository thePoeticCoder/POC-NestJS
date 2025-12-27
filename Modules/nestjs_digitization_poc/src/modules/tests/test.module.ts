import { Module,forwardRef } from '@nestjs/common';
import { TestsController } from './tests.controller';
import { DaoModule } from 'src/dao/dao.module';
import { TestsService } from './tests.service';

import { LogService } from '../../common/services/log.service';
import { WebhookService } from 'src/webhook/webhook.service';
import { ProcessingService } from 'src/health-data/processing.service';
import {AxiosService} from "../../common/services/axios.service"
import { Producer } from 'src/micro-services/producer';
import {DryTests} from "../../dry/tests"
import {CommonService} from "../../common/services/common.service"
import {ErrorHandlerService} from "../../common/services/errorHandler.service"
import { helperErrorHandlerService } from 'src/common/services/errorHandlerHelper.service';
@Module({
  providers: [TestsService,helperErrorHandlerService,CommonService,Producer,AxiosService,LogService,WebhookService,ProcessingService,DryTests,ErrorHandlerService],
  controllers: [TestsController],
  exports: [TestsService,],
  imports: [DaoModule]
})
export class TestsModule {

}
