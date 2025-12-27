import { PlanDurationEnum } from '@kenko-health/shared';
import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DurationDiscountDao {
  @Inject(PrismaService)
  private prisma: PrismaService;

  async create(data: Prisma.DurationDiscountsCreateInput) {
    const zohoDoc = await this.prisma.durationDiscounts.create({
      data: data,
    });
    return zohoDoc;
  }
  async findByPlanDuration(durationName: PlanDurationEnum) {
    const data = await this.prisma.durationDiscounts.findFirst({
      where: {
        durationName,
      },
    });
    return data;
  }
}
