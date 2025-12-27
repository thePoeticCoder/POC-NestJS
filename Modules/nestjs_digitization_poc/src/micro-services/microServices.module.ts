import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { DaoModule } from '../dao/dao.module';
import {HealthDataConsumerService} from "./health-data/healthData.consumer.service"
import { WebhookService } from "src/webhook/webhook.service";
import { ProcessingService } from 'src/health-data/processing.service';
import { Producer } from 'src/micro-services/producer';
import { AxiosService } from 'src/common/services/axios.service';
@Module({

  providers: [HealthDataConsumerService,WebhookService,ProcessingService,Producer,AxiosService],
  exports: [],
  imports: [CommonModule, DaoModule],
})
export class MicroServicesModule {}
