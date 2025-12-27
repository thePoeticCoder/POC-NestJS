import { Module, forwardRef } from '@nestjs/common';
import { ZohoApiCallerService } from './zohoApiCaller.service';
import { ZohoController } from './zoho.controller';
import { ZohoService } from './zoho.service';
import { CommonApiCallerService } from '../../common/services/commonApiCaller.service';
import { CommonModule } from '../../common/common.module';
import { ConverterModule } from '../converters/converter.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { PendingPlanModule } from '../pending-plan/pending-plan.module';
import { PaymentLinkModule } from '../payment-link/payment-link.module';
import { DaoModule } from '../../dao/dao.module';
import { MicroServicesModule } from '../../micro-services/micro-services.module';

@Module({
  controllers: [ZohoController],
  providers: [ZohoService, ZohoApiCallerService, CommonApiCallerService],
  exports: [ZohoService],
  imports: [
    CommonModule,
    ConverterModule,
    TransactionsModule,
    PendingPlanModule,
    PaymentLinkModule,
    forwardRef(() => MicroServicesModule),
    DaoModule,
  ],
})
export class ZohoModule {}
