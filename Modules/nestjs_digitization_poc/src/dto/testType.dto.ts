import { IsNumber, IsString } from "class-validator";
  export class createtestTypeDto{
    @IsString()
    testType:string
 }