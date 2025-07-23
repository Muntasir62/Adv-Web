import { IsEmail, IsString, isString } from "class-validator";

export class createadmindto
{
    @IsString()
    name : string;
    @IsEmail()
    email : string;
    @IsString()
    password : string;
}