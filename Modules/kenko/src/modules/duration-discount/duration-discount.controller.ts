import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CtxId } from '../../common/decorators/ctxId.decorator';
import { ApiResponse } from '../../interfaces/apiResponse';
import { DurationDiscountService } from './duration-discount.service';

@Controller('duration-discount')
export class DurationDiscountController {
  @Inject()
  private durationDiscountService: DurationDiscountService;

  @Post('/')
  async create(@CtxId() ctxId: string, @Body() body: any) {
    const resp = await this.durationDiscountService.create(ctxId, body);
    return new ApiResponse(resp, ctxId);
  }
}
