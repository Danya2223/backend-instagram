import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class RegisterAuthDto{
    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsString()
    @IsNotEmpty()
    password:string;

}
