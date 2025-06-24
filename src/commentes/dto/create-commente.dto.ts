import { IsNotEmpty, IsString } from "class-validator";

export class CreateCommenteDto {

    @IsNotEmpty()
    @IsString()
    content:string;
}
