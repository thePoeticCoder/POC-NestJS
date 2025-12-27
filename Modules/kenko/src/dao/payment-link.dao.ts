import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentLinkDao {
  @Inject(PrismaService)
  private prisma: PrismaService;

  async create(data: Prisma.PaymentLinkCreateInput) {
    const paymentLink = await this.prisma.paymentLink.create({
      data: data,
    });
    return paymentLink;
  }
  async findById(id: number) {
    const paymentLinkDb = await this.prisma.paymentLink.findUnique({
      where: {
        id: id,
      },
    });
    return paymentLinkDb;
  }
  async findByPaymentLink(paymentLinkId: string) {
    const paymentLinkDb = await this.prisma.paymentLink.findFirst({
      where: {
        paymentLinkId: paymentLinkId,
      },
    });
    return paymentLinkDb;
  }
  async updateById(id: number, body: any) {
    const paymentLinkDb = await this.prisma.paymentLink.update({
      where: {
        id: id,
      },
      data: body,
    });
    return paymentLinkDb;
  }
  async findByTransactionId(transactionId: number) {
    const paymentLinkDb = await this.prisma.paymentLink.findUnique({
      where: {
        transactionId: transactionId,
      },
    });
    return paymentLinkDb;
  }
  async clearDB() {
    const result = await this.prisma.paymentLink.deleteMany({});
    return result;
  }
}
