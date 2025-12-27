import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DurationDiscountDao } from './durationDiscount.dao';
import { PaymentLinkDao } from './payment-link.dao';
import { PendingPlanDao } from './pending-plan.dao';
import { ProcessedEventsDao } from './processedEvents.dao';
import { TransactionDao } from './transaction.dao';
import { ZohoDao } from './zoho.dao';

@Module({
  imports: [PrismaService],
  exports: [
    DurationDiscountDao,
    ZohoDao,
    PaymentLinkDao,
    TransactionDao,
    PendingPlanDao,
    ProcessedEventsDao,
  ],
  providers: [
    DurationDiscountDao,
    PrismaService,
    ZohoDao,
    PaymentLinkDao,
    TransactionDao,
    PendingPlanDao,
    ProcessedEventsDao,
  ],
})
export class DaoModule {}
