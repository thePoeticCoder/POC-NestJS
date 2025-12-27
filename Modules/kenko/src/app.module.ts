import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CtxIdMiddleware } from './common/middlewares/ctxId.midddleware';
import { ConverterModule } from './modules/converters/converter.module';
import { RazorpayModule } from './modules/razorpay/razorpay.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { ZohoModule } from './modules/zoho/zoho.module';
import { CommonModule } from './common/common.module';
import { PendingPlanModule } from './modules/pending-plan/pending-plan.module';
import { PaymentLinkModule } from './modules/payment-link/payment-link.module';
import { PaymentModule } from './modules/payment/payment.module';
import { DurationDiscountModule } from './modules/duration-discount/duration-discount.module';
import { DaoModule } from './dao/dao.module';
import { MicroServicesModule } from './micro-services/micro-services.module';

@Module({
  imports: [
    RazorpayModule,
    ZohoModule,
    PaymentModule,
    ConverterModule,
    TransactionsModule,
    CommonModule,
    PendingPlanModule,
    PaymentLinkModule,
    DurationDiscountModule,
    DaoModule,
    MicroServicesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // QueueInitAndDestroyService
  ],
})
export class AppModule implements NestModule {
  configure(userContext: MiddlewareConsumer) {
    userContext
      .apply(CtxIdMiddleware)
      .forRoutes({ path: '/**', method: RequestMethod.ALL });
  }
}
