import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { MiscMessages } from '@kenko-health/shared';
import { LogService } from '../../common/services/log.service';
import { AppConfig } from '../../config';
import { ZohoDao } from '../../dao/zoho.dao';
import { PaymentLinkDao } from '../../dao/payment-link.dao';
import { PendingPlanDao } from '../../dao/pending-plan.dao';
import { TransactionDao } from '../../dao/transaction.dao';
import { ProcessedEventsDao } from '../../dao/processedEvents.dao';

@Injectable()
export class PaymentService {
  @Inject(ZohoDao)
  private zohoDao: ZohoDao;

  @Inject(PaymentLinkDao)
  private paymentLinkDao: PaymentLinkDao;

  @Inject(PendingPlanDao)
  private pendingPlanDao: PendingPlanDao;

  @Inject(TransactionDao)
  private transactionDao: TransactionDao;

  @Inject(ProcessedEventsDao)
  private processedEventsDao: ProcessedEventsDao;

  @Inject()
  private logService: LogService;

  //     constructor(
  //       private transactionsService: TransactionsService,
  //       private prisma: PrismaService,
  //       private readonly razorpayService: RazorpayService,
  //       private readonly logService: LogService, // private readonly rmqQueueService : RMQQueueService
  //     ) { }

  //   async createPaymentLink(paymentReq: PaymentLinkReqBody, ctxId: string) {
  //   // ? STEPS

  //   // 1 - fetch user details , plan details , user credentials ( to check zoho id ) from KWB
  //   // 2 - process raw data in convertors to convert into rzp request and create payment link
  //   // 3 - create zoho invoice ( zoho service ) , if zoho customer not exist , create zoho customer also
  //   // 4 - create pending plan
  //   // 5 - create transaction
  //   // 6 - return response ( rzp link , transaction doc id , more need to decide )
  //   // 7 -

  //   this.logService.info(ctxId, 'paymentReq');

  //   try {
  //     const createdRzpLink = await this.razorpayService.createPaymentLink(
  //       paymentReq,
  //       ctxId,
  //     );

  //     const monthlyRzpLink =
  //       await this.razorpayService.createMonthlyPaymentLink(ctxId);

  //     const transaction = await this.transactionsService.createTransaction(
  //       paymentReq,
  //       createdRzpLink,
  //       ctxId,
  //     );

  //     const razorpay = await this.razorpayService.createRazorpay(
  //       transaction,
  //       createdRzpLink,
  //       ctxId,
  //     );

  //     return {
  //       createdRzpLink,
  //       monthlyRzpLink,
  //       transaction,
  //       razorpay,
  //     };
  //   } catch (e) {
  //     console.log('err in createPaymentLink =>', e);
  //   }
  // }

  //   async createPaymentLinkFromEvent(
  //   paymentReq: PaymentLinkReqEvent,
  //   ctxId: string,
  // ) {
  //   console.log('body=>', paymentReq, ctxId);

  //   try {
  //   } catch (e) { }
  // }

  //   async paymentLinkReqForRzp(
  //   reqSource: RequestSourceEnum,
  //   paymentReq: PaymentLinkReqEvent | PaymentLinkReqBody,
  //   ctxId: string,
  // ) {
  //   try {
  //     if (reqSource === RequestSourceEnum.BODY) {
  //       const { hsId, planName, planDuration }: any = paymentReq;

  //       // const createRzpLink = await this.razorpayService.createPaymentLink(paymentReq,ctxId);
  //     }

  //     if (reqSource === RequestSourceEnum.EVENT) {
  //       const { userId, planId, planDuration }: any = paymentReq;
  //     }
  //   } catch (e) { }
  // }

  //   async transactionsList(ctxId: string) {
  //   const result = await this.transactionsService.getAllTransactions();
  //   return result;
  // }

  //   async sendPostPaymentEvent(paymentEntity: PaymentEntityEnum, ctxId: string) {
  //   // const postPaymentEvent: PostPaymentEvent = {
  //   //   userId: 'string',
  //   //   paymentEntity,
  //   //   planId: 'string',
  //   //   planName: 'string',
  //   //   planDurationMonths: 1,
  //   //   paymentLink: 'string',
  //   //   //dates(dd/mm/yyyy)
  //   //   invoiceDate: 'string',
  //   //   paymentDate: 'string',
  //   // };
  // }

  //   // ! ------------------------------------ TEST -----------------------------------
  //   // ! ------------------------------------ TEST -----------------------------------
  //   // ! ------------------------------------ TEST -----------------------------------
  //   // ! ------------------------------------ TEST -----------------------------------

  //   async testFunction(ctxId: string) {
  //   const dataToPass = {
  //     good: 'boy',
  //   };

  //   // await this.rmqQueueService.sendEventToTargetQueue("QUEUE_DIGITIZATION","TEST_EVENT_payment_SERVICE_TO_DIGITIZATION",ctxId,dataToPass);

  //   return 'SUCCESS';
  // }

  async clearDB(ctxId: string) {
    this.logService.info(ctxId, `inside clearDB`);
    //SKIP FOR PROD ENV
    if (AppConfig.isProd) {
      this.logService.info(ctxId, `this api will not run in prod`);
      throw new HttpException(
        'this api will not run in prod',
        HttpStatus.BAD_REQUEST,
      );
    }
    await Promise.all([
      this.pendingPlanDao.clearDB(),
      this.paymentLinkDao.clearDB(),
      this.zohoDao.clearDB(),
      this.processedEventsDao.clearDB(),
    ]);
    await this.transactionDao.clearDB();
    return MiscMessages.SUCCESS;
  }
}
