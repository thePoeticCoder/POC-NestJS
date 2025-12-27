import { IsNotEmpty,IsString,IsNumber,IsOptional } from "class-validator";
export class createOrganMarkerDtO{
    @IsString()
    organId:string
    @IsString()
    markerId  :string
}
