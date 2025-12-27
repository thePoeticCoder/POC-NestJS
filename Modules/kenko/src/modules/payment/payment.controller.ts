import { Controller, Get } from '@nestjs/common';
import { CtxId } from '../../common/decorators/ctxId.decorator';
import { ApiResponse } from '../../interfaces/apiResponse';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // @Post('createPaymentLink')
  // async createPaymentLink(
  //   @CtxId() ctxId: string,
  //   @Body() body: PaymentLinkReqBody,
  // ) {
  //   const resp = await this.paymentService.createPaymentLink(body, ctxId);

  //   return new ApiResponse(resp, ctxId);
  // }

  // // ? testing only
  // @Post('createPaymentLinkFromEvent')
  // async createPaymentLinkFromEvent(
  //   @CtxId() ctxId: string,
  //   @Body() body: PaymentLinkReqEvent,
  // ) {
  //   const resp = await this.paymentService.createPaymentLinkFromEvent(
  //     body,
  //     ctxId,
  //   );

  //   return new ApiResponse(resp, ctxId);
  // }

  // @Get('transactionsList')
  // async transactionsList(@CtxId() ctxId: string) {
  //   const resp = await this.paymentService.transactionsList(ctxId);

  //   return new ApiResponse(resp, ctxId);
  // }

  // // ! -------------------------- TEST ------------------------

  // @Get('test-event-send-to-degitization')
  // async eventSendTest(@CtxId() ctxId: string) {
  //   const resp = await this.paymentService.testFunction(ctxId);

  //   return new ApiResponse(resp, ctxId);
  // }

  @Get('/clearDB')
  async clearDB(@CtxId() ctxId: string) {
    const resp = await this.paymentService.clearDB(ctxId);
    return new ApiResponse(resp, ctxId);
  }
}
