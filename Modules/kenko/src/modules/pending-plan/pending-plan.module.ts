import { Module } from '@nestjs/common';
import { DaoModule } from '../../dao/dao.module';
import { PendingPlanService } from './pending-plan.service';

@Module({
  providers: [PendingPlanService],
  exports: [PendingPlanService],
  imports: [DaoModule],
})
export class PendingPlanModule {}
