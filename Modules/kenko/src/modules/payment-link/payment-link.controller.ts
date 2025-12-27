import { MiscMessages } from '@kenko-health/shared';
import { Controller, Get, Inject, Param, Query, Res } from '@nestjs/common';
import { CtxId } from '../../common/decorators/ctxId.decorator';
import { ApiResponse } from '../../interfaces/apiResponse';
import { PaymentLinkService } from './payment-link.service';

@Controller('payment-link')
export class PaymentLinkController {
  @Inject()
  private paymentLinkService: PaymentLinkService;

  @Get('/:paymentLinkId')
  async getInvoiceLinkById(
    @Res() res,
    @CtxId() ctxId: string,
    @Param('paymentLinkId') paymentLinkId: string,
    @Query('utm_source') utm_source: string,
  ) {
    const invoiceUrl = await this.paymentLinkService.getInvoiceLinkById(
      ctxId,
      paymentLinkId,
      utm_source,
    );
    res.redirect(invoiceUrl);
    return new ApiResponse(MiscMessages.SUCCESS, ctxId);
  }
}
