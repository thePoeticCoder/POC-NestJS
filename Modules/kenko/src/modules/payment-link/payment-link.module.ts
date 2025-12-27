import { Module } from '@nestjs/common';
import { PaymentLinkService } from './payment-link.service';
import { PaymentLinkController } from './payment-link.controller';
import { TransactionsModule } from '../transactions/transactions.module';
import { DaoModule } from '../../dao/dao.module';
import { CommonModule } from '../../common/common.module';

@Module({
  providers: [PaymentLinkService],
  exports: [PaymentLinkService],
  imports: [TransactionsModule, DaoModule, CommonModule],
  controllers: [PaymentLinkController],
})
export class PaymentLinkModule {}
