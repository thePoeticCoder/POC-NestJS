import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { TransactionConverterService } from '../converters/transaction.converter.service';

@Injectable()
export class TransactionsService {
  constructor(
    private transactionConverterService: TransactionConverterService,
    private prisma: PrismaService,
  ) {}

  async createTransactionInDb(
    toCreateTransaction: Prisma.TransactionCreateInput,
    ctxId: string,
  ) {
    const transaction = await this.prisma.transaction.create({
      data: toCreateTransaction,
    });

    return transaction;
  }

  async createTransaction(paymentReq: any, createdRzpLink: any, ctxId: string) {
    // return "SUCCESS"

    try {
      const toCreateTransactionBody =
        await this.transactionConverterService.createTransactionBody(ctxId, {});

      const createdTransaction = await this.createTransactionInDb(
        toCreateTransactionBody,
        ctxId,
      );

      return createdTransaction;
    } catch (e) {
      console.log('error in createTransaction', e);
    }
  }

  async getAllTransactions() {
    try {
      const transaction = await this.prisma.transaction.findMany({
        where: {},
      });

      return transaction;
    } catch (e) {
      console.log('error in getAllTransactions', e);
    }
  }
}
