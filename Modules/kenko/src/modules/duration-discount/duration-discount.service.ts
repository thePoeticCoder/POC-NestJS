import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { LogService } from '../../common/services/log.service';
import { DurationDiscountDao } from '../../dao/durationDiscount.dao';

@Injectable()
export class DurationDiscountService {
  @Inject(DurationDiscountDao)
  private durationDiscountDao: DurationDiscountDao;

  @Inject()
  private logService: LogService;

  async create(ctxId: string, body: any) {
    this.logService.info(ctxId, `inside duration discount creation method`);
    const payload: Prisma.DurationDiscountsCreateInput = {
      durationName: body.durationName,
      daysInDuration: body.daysInDuration,
      discount: body.discount,
      monthCount: body.monthCount,
      specialOffer: body.specialOffer ? body.specialOffer : '',
      discountType: body.discountType,
    };
    return await this.durationDiscountDao.create(payload);
  }
}
