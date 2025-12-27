import { Module } from '@nestjs/common';
import { DurationDiscountService } from './duration-discount.service';
import { DurationDiscountController } from './duration-discount.controller';
import { CommonModule } from '../../common/common.module';
import { DaoModule } from '../../dao/dao.module';

@Module({
  providers: [DurationDiscountService],
  controllers: [DurationDiscountController],
  imports: [DaoModule, CommonModule],
})
export class DurationDiscountModule {}
