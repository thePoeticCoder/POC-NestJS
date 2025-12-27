import { IsNotEmpty,IsString,IsNumber,IsOptional } from "class-validator";

export class createOrganDtO{
    @IsString()
    organName:string
    @IsString()
    organNormalIcon:string
    @IsString()
    organAbnormalIcon:string
    @IsString()
    organInactiveIcon:string

}

export class updateOrganDtO{
    @IsString()
    organName: string
    @IsString()
    organNormalIcon:string
    @IsString()
    organAbnormalIcon:string
    @IsString()
    organInactiveIcon:string

}

export class getAllOrganDto{
    organIds: string[]
  

}
