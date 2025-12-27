import { IsNumber, IsString } from "class-validator";

export class createMetaDataDto{
    @IsString()
    markerName:string 
    @IsString()        
    markerValue:string
 }
 