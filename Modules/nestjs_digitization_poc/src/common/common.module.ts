import { Module ,forwardRef} from '@nestjs/common';
import { LogService } from './services/log.service';
import { CommonService } from './services/common.service';
import { QueueFactoryService } from './queue/queueFactory.service';
import {DaoModule} from "../dao/dao.module"
import {WebhookService} from "../webhook/webhook.service"
import { ProcessingService } from 'src/health-data/processing.service';
import { AxiosService } from './services/axios.service';
import { Producer } from 'src/micro-services/producer';
import {ErrorHandlerService} from "./services/errorHandler.service"
import { helperErrorHandlerService } from './services/errorHandlerHelper.service';
import {EncryptionService} from "./services/encryption.service"
@Module({
  providers: [  
    LogService,
    CommonService,
    QueueFactoryService,
    WebhookService,
    ProcessingService,
    AxiosService,
    Producer,
    ErrorHandlerService,
    helperErrorHandlerService,
    EncryptionService
  ],
  exports: [
    LogService,
    CommonService,
    QueueFactoryService,
    ErrorHandlerService,
    helperErrorHandlerService,
    EncryptionService
  ],
  imports:[DaoModule]
})
export class CommonModule {}
