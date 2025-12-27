import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { PlanDurationEnum } from '../constants/enums';

export class PaymentLinkReqEvent {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  planId: string;

  @IsNotEmpty()
  @IsEnum(PlanDurationEnum)
  planDuration: string;
}
