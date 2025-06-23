
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto{
        @IsOptional()
        userName?: string;

        @IsOptional()
        email?: string;

        @IsOptional()
        password?: string;

        @IsOptional()
        bio?: string;
}
