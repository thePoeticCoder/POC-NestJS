import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LogService {
  private logger = new Logger();

  private getLogData(ctx: string, msg: any) {
    const log = {
      id: ctx,
      data: msg,
    };
    return JSON.stringify(log);
  }

  info(ctx: string, msg: any,...others:any[]) {
    this.logger.log(this.getLogData(ctx, msg),...others);
  }

  error(ctx: string, msg: any,...others:any[]) {
    this.logger.error(this.getLogData(ctx, msg),...others);
  }


  printObject(ctx: string, msg: string, inputObj: any) {
    this.info(ctx, `in printObject...`);

    if (!inputObj) {
      this.info(ctx, `obj was undefined `);
      return;
    }

    try {
      let objString = '';
      const keys = Object.keys(inputObj);
      for (const k of keys) {
        objString += `${k}=[${inputObj[k]}]  <#> `;
      }
      this.info(ctx, `${msg} => ${objString}`);
    } catch (e) {
      const { message, error } = e;
      this.info(
        ctx,
        `error in printObject => message=[${message}] , error=[${error}]`,
      );
    }
  }
}
