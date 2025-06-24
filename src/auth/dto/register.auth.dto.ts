import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class RegisterAuthDto {
    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @MaxLength(10)
    @MinLength(6)
    @IsString()
    @IsNotEmpty()
    password: string;

}
