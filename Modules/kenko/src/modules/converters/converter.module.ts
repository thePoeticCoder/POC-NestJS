import { Module } from '@nestjs/common';
import { CommonDateService } from '../../common/services/common-date.service';
import { CommonModule } from '../../common/common.module';
import { PaymentLinkConverterService } from './paymentLink.converter.service';
import { PendingConverterService } from './pendingPlan.converter.service';
import { TransactionConverterService } from './transaction.converter.service';
import { ZohoConverterService } from './zoho.converter.service';
import { DaoModule } from '../../dao/dao.module';

@Module({
  providers: [
    TransactionConverterService,
    ZohoConverterService,
    PendingConverterService,
    CommonDateService,
    PaymentLinkConverterService,
  ],
  exports: [
    TransactionConverterService,
    ZohoConverterService,
    PendingConverterService,
    PaymentLinkConverterService,
  ],
  imports: [DaoModule, CommonModule],
})
export class ConverterModule {}
