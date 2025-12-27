import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ZohoDao {
  @Inject(PrismaService)
  private prisma: PrismaService;

  async create(data: Prisma.ZohoCreateInput) {
    const zohoDoc = await this.prisma.zoho.create({
      data: data,
    });
    return zohoDoc;
  }
  async findByInvoiceId(invoiceId: string) {
    const zohoDoc = await this.prisma.zoho.findFirst({
      where: {
        invoiceId: invoiceId,
      },
    });
    return zohoDoc;
  }
  async findByTransactionId(transactionId: number) {
    const zohoDoc = await this.prisma.zoho.findFirst({
      where: {
        transactionId: transactionId,
      },
    });
    return zohoDoc;
  }
  async clearDB() {
    const result = await this.prisma.zoho.deleteMany({});
    return result;
  }
}
