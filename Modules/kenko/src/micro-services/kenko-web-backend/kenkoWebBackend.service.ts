import { GetUserDetailsReq } from '@kenko-health/shared';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import Axios from 'axios';
import { ErrorHandlerService } from '../../common/services/errorHandler.service';
import { LogService } from '../../common/services/log.service';
import { AppConfig } from '../../config';
@Injectable()
export class KenkoWebBackendService {
  @Inject()
  private errorHandlerService: ErrorHandlerService;

  @Inject()
  private logService: LogService;

  async getDurationDetailsByduration(planDuration: string, ctxId: string) {}

  async getPlanDetailsByPlanName(planName: string, ctxId: string) {}

  async getUserDetailsFromHubspotId(hubspotId: string, ctxId: string) {
    //temp
    return false;

    const url = '';

    try {
      const result = await Axios.get(url);

      return result;
    } catch (e) {
      return e;
    }
  }

  async getUserDetails(payload: GetUserDetailsReq, ctxId: string) {
    this.logService.info(ctxId, `inside getUserDetails method`);
    const url = `${AppConfig.mainBackendUrl}/api/v1/user-internal/getUserDetails`;
    try {
      const result = await Axios.post(url, payload);
      const { data } = result;
      const { data: dataInsideData } = data;
      this.logService.info(
        ctxId,
        `successfully executed method=[getUserDetails]`,
      );
      return dataInsideData;
    } catch (e) {
      this.errorHandlerService.handleError(e, ctxId, {
        methodName: 'getUserDetails',
        sendErrorNotification: false,
      });
      throw new HttpException(
        'Error while generate zoho token',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
