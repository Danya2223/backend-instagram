import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongodb";
import { HydratedDocument } from "mongoose";

export type PostDocument = HydratedDocument<Posts>;

@Schema({timestamps: true})
export class Posts{
    @Prop({required: true})
    userId:ObjectId;

    @Prop({required: true})
    image: string;

    @Prop({required: true})
    caption:string;

    @Prop()
    commentsCount:number;

   

}

export const PostShema =SchemaFactory.createForClass(Posts);
