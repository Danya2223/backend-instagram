import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {

    @IsString()
    @IsNotEmpty()
    image: string;

    @IsString()
    @IsNotEmpty()
    caption: string;

}
