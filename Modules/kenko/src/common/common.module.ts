import { Module } from '@nestjs/common';
import { CommonApiCallerService } from './services/commonApiCaller.service';
import { CommonDateService } from './services/common-date.service';
import { ErrorHandlerService } from './services/errorHandler.service';
import { LogService } from './services/log.service';
import { CommonService } from './services/common.service';
import { HubspotService } from './services/hubspot.service';
import { QueueFactoryService } from './queue/queueFactory.service';
import { CommonProducerService } from './queue/commonProducer.service';

@Module({
  providers: [
    CommonApiCallerService,
    CommonDateService,
    LogService,
    ErrorHandlerService,
    CommonService,
    HubspotService,
    QueueFactoryService,
    CommonProducerService,
  ],
  exports: [
    CommonApiCallerService,
    CommonDateService,
    LogService,
    ErrorHandlerService,
    CommonService,
    HubspotService,
    QueueFactoryService,
    CommonProducerService,
  ],
})
export class CommonModule {}
