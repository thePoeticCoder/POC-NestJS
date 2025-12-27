import { Module } from '@nestjs/common';
import { CommonModule } from '../../common/common.module';
import { DaoModule } from '../../dao/dao.module';
import { PrismaService } from '../../prisma/prisma.service';
import { TransactionConverterService } from '../converters/transaction.converter.service';
import { TransactionsService } from './transactions.service';

@Module({
  providers: [PrismaService, TransactionsService, TransactionConverterService],
  exports: [TransactionsService],
  imports: [DaoModule, CommonModule],
})
export class TransactionsModule {}
