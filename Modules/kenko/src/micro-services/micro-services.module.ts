import { Module, forwardRef } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { DaoModule } from '../dao/dao.module';
import { ZohoModule } from '../modules/zoho/zoho.module';
import { CRMProducerService } from './crm-service/crmProducer.service';
import { KenkoWebBackendService } from './kenko-web-backend/kenkoWebBackend.service';
import { KenkoWebBackendConsumerService } from './kenko-web-backend/kenkoWebBackendConsumer.service';
import { KenkoWebBackendProducerService } from './kenko-web-backend/kenkoWebBackendProducer.service';
import { NotificationProducerService } from './notification-service/notificationProducer.service';
import { SchedulerConsumerService } from './scheduler-service/schedulerConsumer.service';

@Module({
  providers: [
    CRMProducerService,
    SchedulerConsumerService,
    KenkoWebBackendService,
    KenkoWebBackendProducerService,
    KenkoWebBackendConsumerService,
    NotificationProducerService,
  ],
  exports: [
    CRMProducerService,
    SchedulerConsumerService,
    KenkoWebBackendService,
    KenkoWebBackendProducerService,
    KenkoWebBackendConsumerService,
    NotificationProducerService,
  ],
  imports: [CommonModule, forwardRef(() => ZohoModule), DaoModule],
})
export class MicroServicesModule {}
