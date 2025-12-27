import { isEmpty, IsNotEmpty, IsNumber, IsString,IsOptional, IsBoolean, IsEmail } from "class-validator";
export class User {
    @IsString()
    userName:string;
    @IsEmail()
    userEmail:string;
    @IsString()
    password : string;
    ownerHubspotId:string ;
    role:string
}