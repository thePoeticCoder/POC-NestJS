import { MiscMessages, Services } from '@kenko-health/shared';
import { _slackNotifyForError } from '@kenko-health/utils';
import { Inject, Injectable } from '@nestjs/common';
import { AppConfig } from '../../config';
import { LogService } from './log.service';

export interface ErrorMetaData {
  methodName: string;
  userId?: string;
  emailId?: string;
  sendErrorNotification?: boolean;
}

@Injectable()
export class ErrorHandlerService {
  @Inject()
  private logService: LogService;

  handleError(e: any, logId: string, errorMetaData: ErrorMetaData) {
    const { emailId, sendErrorNotification, methodName, userId } =
      errorMetaData;
    try {
      const { message, error, code = -1 } = e;

      //form error msg for logging
      let finalErrorMsg = `error in [${methodName}] , message=[${message}] , error=[${error}] , code=[${code}]`;
      finalErrorMsg += `emailId=[${emailId}] , userId=[${userId}]`;
      this.logService.error(logId, finalErrorMsg);

      //send notification only if this is true
      if (sendErrorNotification) {
        _slackNotifyForError({
          isProd: AppConfig.isProd,
          logId,
          msg: finalErrorMsg,
          serviceName: Services.PAYMENT,
        });
      } else {
        this.logService.error(logId, MiscMessages.SKIP_SLACK_MSG);
      }
    } catch (e) {
      const { message, error } = e;
      const finalErrorMsg = `error in [${methodName}] + [ErrorHandlerService.handleError] , message=[${message}] , error=[${error}] `;
      this.logService.error(logId, finalErrorMsg);
      _slackNotifyForError({
        isProd: AppConfig.isProd,
        logId,
        msg: finalErrorMsg,
        serviceName: Services.PAYMENT,
      });
    }
  }
}
