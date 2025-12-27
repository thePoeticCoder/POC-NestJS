import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { LogService } from '../../common/services/log.service';

@Injectable()
export class TransactionConverterService {
  @Inject()
  private logService: LogService;
  async createTransactionBody(ctxId: string, body: any) {
    this.logService.info(ctxId, `inside createTransactionBody method`);
    const toCreateTransaction: Prisma.TransactionCreateInput = {
      userCollectionId: body.userCollectionId,
      transactionMedium: body.transactionMedium,
      transactionEntity: body.transactionEntity,
      orderCollectionId: body.orderCollectionId,
      userPlanCollectionId: body.userPlanCollectionId,
      basePlanCollectionId: body.basePlanCollectionId,
      doubleCoverageFlag: body.doubleCoverageFlag,
      annualFlag: body.annualFlag,
      couponCodeId: body.couponCodeId,
      planDuration: body.planDuration,
      status: body.status,
      clientOrigin: body.clientOrigin,
      paymentDate: '',
      paymentMedium: body.paymentMedium,
      transactionDocStatus: body.transactionDocStatus,
      paymentEntity: body.paymentEntity,
    };
    this.logService.info(
      ctxId,
      `successfully executed method=[createTransactionBody]`,
    );
    return toCreateTransaction;
  }
}
