import { SchedulerServiceGenericEvent } from '@kenko-health/shared';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CtxId } from '../../common/decorators/ctxId.decorator';
import { ApiResponse } from '../../interfaces/apiResponse';
import { ZohoService } from './zoho.service';

@Controller('zoho')
export class ZohoController {
  @Inject()
  private zohoService: ZohoService;

  @Post('/createInvoiceByEvent')
  async createInvoiceByEvent(
    @CtxId() ctxId: string,
    @Body() body: SchedulerServiceGenericEvent,
  ) {
    const resp = await this.zohoService.createInvoiceByEvent(ctxId, body);
    return new ApiResponse(resp, ctxId);
  }
}
