import { Module } from '@nestjs/common';
import { LogService } from '../../common/services/log.service';
import { DaoModule } from '../../dao/dao.module';
import { MicroServicesModule } from '../../micro-services/micro-services.module';
import { PrismaService } from '../../prisma/prisma.service';
import { TransactionConverterService } from '../converters/transaction.converter.service';
import { RazorpayService } from '../razorpay/razorpay.service';
import { TransactionsService } from '../transactions/transactions.service';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  providers: [
    PaymentService,
    RazorpayService,
    LogService,
    PrismaService,
    TransactionsService,
    TransactionConverterService,
    // RMQQueueService
  ],
  exports: [PaymentService],
  controllers: [PaymentController],
  imports: [MicroServicesModule, DaoModule],
})
export class PaymentModule {}
