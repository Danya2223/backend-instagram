
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto{

        @IsString()
        @IsOptional()
        userName?: string;

        @IsEmail()
        @IsOptional()
        email?: string;

        @MaxLength(10)
        @MinLength(6)
        @IsOptional()
        password?: string;

        @IsString()
        @IsOptional()
        bio?: string;
}
