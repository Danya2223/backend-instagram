import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {

    @IsNotEmpty()
    image: string;

    @IsString()
    @IsNotEmpty()
    caption: string;

}
