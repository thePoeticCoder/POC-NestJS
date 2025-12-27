import { Inject, Injectable } from '@nestjs/common';
import { LogService } from './log.service';

@Injectable()
export class CommonService {
  @Inject()
  private logService: LogService;

  getTodayDate() {
    const now = new Date();
    const dd = now.getDate();
    const tempMonth = now.getMonth() + 1;
    const mm = tempMonth < 10 ? `0${tempMonth}` : tempMonth;
    const yy = now.getFullYear();

    const expiryDate = `${dd}-${mm}-${yy}`;
    return expiryDate;
  }

  getCurrentEpoch(ctx: string) {
    const nowEpoch = Math.ceil(Date.now() / 1000);
    this.logService.info(
      ctx,
      `inside getCurrentEpoch , returning [${nowEpoch}]`,
    );
    return `${nowEpoch}`;
  }
}
