import { IsNotEmpty, IsString } from "class-validator";

export class UpdatePostDto {

    @IsString()
    @IsNotEmpty()
    postId:string;

    @IsString()
    @IsNotEmpty()
    caption: string;
}
