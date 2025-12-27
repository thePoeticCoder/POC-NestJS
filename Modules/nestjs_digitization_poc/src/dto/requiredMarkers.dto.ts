import { IsNotEmpty,IsString,IsNumber,IsOptional } from "class-validator";
export class createRequiredMarkerDto{
    @IsString()
    testTypeId:string
    @IsString()
    markerName:string
    @IsString()
    markerUnit:string
    @IsNumber()
    emergencyRangeLowerLimit:number
    @IsNumber()
    emergencyRangeUpperLimit:number
    @IsNumber()
    abnormalRangeLowerLimit:number
    @IsNumber()
    abnormalRangeUpperLimit:number
    @IsNumber()
    normalRangeLowerLimit:number
    @IsNumber()
    normalRangeUpperLimit:number
    @IsString()
    organId:string
  }



