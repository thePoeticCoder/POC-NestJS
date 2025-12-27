import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TransactionDao {
  @Inject(PrismaService)
  private prisma: PrismaService;

  async create(data: Prisma.TransactionCreateInput) {
    const transaction = await this.prisma.transaction.create({
      data: data,
    });
    return transaction;
  }
  async findById(transactionId: number) {
    const transactionDb = await this.prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
    });
    return transactionDb;
  }
  async update(transactionId: number, data: any) {
    const updated = await this.prisma.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        ...data,
      },
    });
    return updated;
  }
  async find(query: any) {
    const data = await this.prisma.transaction.findMany({
      where: { ...query },
    });
    return data;
  }
  async getTransactionsDocsByUserId(userCollectionId: string) {
    const data = await this.prisma.transaction.findMany({
      where: { userCollectionId },
    });
    return data;
  }
  async clearDB() {
    const result = await this.prisma.transaction.deleteMany({});
    return result;
  }
}
