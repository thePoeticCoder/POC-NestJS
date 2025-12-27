import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PendingPlanDao {
  @Inject(PrismaService)
  private prisma: PrismaService;

  async create(data: Prisma.PendingUserPlanCreateInput) {
    const pendingPlan = await this.prisma.pendingUserPlan.create({
      data: data,
    });
    return pendingPlan;
  }

  async clearDB() {
    const result = await this.prisma.pendingUserPlan.deleteMany({});
    console.log(result);
    return result;
  }
}
