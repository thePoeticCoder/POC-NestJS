import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { PlanDurationEnum, PlanNamesEnum } from '../constants/enums';

export class PaymentLinkReqBody {
  @IsNotEmpty()
  hsId: string;

  @IsNotEmpty()
  @IsEnum(PlanNamesEnum)
  planName: string;

  @IsNotEmpty()
  @IsEnum(PlanDurationEnum)
  planDuration: string;
}
