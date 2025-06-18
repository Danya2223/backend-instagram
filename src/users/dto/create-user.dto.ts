import { IsNotEmpty } from "class-validator";
import { ObjectId } from "mongoose";

export class CreateUserDto {
   @IsNotEmpty()
    userName: string;

    @IsNotEmpty()
    email:string;

   @IsNotEmpty()
    password:string;

   @IsNotEmpty()
    bio:string;

}
