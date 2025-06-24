import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";

export type PostDocument = HydratedDocument<Posts>;

@Schema({ timestamps: true })
export class Posts {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' ,required: true })
    userId: Types.ObjectId;

    @Prop({ required: true })
    image: string;

    @Prop({ required: true })
    caption: string;
}

export const PostShema = SchemaFactory.createForClass(Posts);
