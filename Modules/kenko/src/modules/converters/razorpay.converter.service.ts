import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  Prisma,
  Transaction,
  PendingUserPlan,
  Razorpay,
  Zoho,
} from '@prisma/client';

@Injectable()
export class RazorpayConverterService {
  // async createTransactionBody () {
  //     const toCreateTransaction : Prisma.TransactionCreateInput  = {
  //         userCollectionId : "12345" ,
  //         razorPayId : "rzp1" ,
  //         zohoId : "zoho1" ,
  //         transactionMedium :"" ,
  //         transactionEntity : "" ,
  //         orderCollectionId : "" ,
  //         userPlanCollectionId : "" ,
  //         basePlanCollectionId : "" ,
  //         doubleCoverageFlag : true ,
  //         annualFlag : true ,
  //         couponCodeId : "" ,
  //         planDuration : "" ,
  //         status : "" ,
  //         clientOrigin : "" ,
  //         paymentDate : new Date() ,
  //         transactionDocStatus : "NEW"
  //     }
  //     return toCreateTransaction;
  // }
}
