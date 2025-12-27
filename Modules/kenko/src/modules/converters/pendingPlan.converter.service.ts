import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { LogService } from '../../common/services/log.service';

@Injectable()
export class PendingConverterService {
  @Inject()
  private logService: LogService;
  async createPendingPlanBody(ctxId: string, body: any) {
    this.logService.info(ctxId, `inside createPendingPlanBody method`);
    const pendingPlan: Prisma.PendingUserPlanCreateInput = {
      userCollectionId: body.userCollectionId,
      transaction: {
        connect: {
          id: body.transactionId,
        },
      },
      basePlanId: body.basePlanId,
      questionaireId: body.questionaireId,
      userBasePlanName: body.userBasePlanName,
      userPlanId: body.userPlanId,
      planDuration: body.planDuration,
      userPlanTotalDuration: body.userPlanTotalDuration,
      userPlanDescription: body.userPlanDescription,
      userPlanTotalPrice: body.userPlanTotalPrice,
      userFamilyDependents: body.userFamilyDependents,
      addOn: body.addOn,
      doubleCoverageFlag: body.doubleCoverageFlag,
      annualFlag: body.annualFlag,
      updatedBy: body.updatedBy,
      validity: body.validity,
    };
    this.logService.info(
      ctxId,
      `successfully executed method=[createPendingPlanBody]`,
    );
    return pendingPlan;
  }
}
