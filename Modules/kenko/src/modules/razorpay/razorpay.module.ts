import { Module } from '@nestjs/common';
import { CommonModule } from '../../common/common.module';
import { MicroServicesModule } from '../../micro-services/micro-services.module';
import { PrismaService } from '../../prisma/prisma.service';
import { TransactionConverterService } from '../converters/transaction.converter.service';
import { TransactionsService } from '../transactions/transactions.service';
import { RazorpayService } from './razorpay.service';

@Module({
  providers: [
    PrismaService,
    RazorpayService,
    TransactionsService,
    TransactionConverterService,
  ],
  exports: [RazorpayService],
  imports: [MicroServicesModule, CommonModule],
})
export class RazorpayModule {}
