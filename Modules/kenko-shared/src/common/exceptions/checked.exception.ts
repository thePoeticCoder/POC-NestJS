import { ErrorCode } from "../enums-and-constants/global.constants";


export class CheckedException {

  error: any;
  code: number;


  constructor(error: any, code?: number) {
    this.error = error;
    this.code = (code) ? code : ErrorCode.GENERIC_CLIENT_ERROR;
  }

}