import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";

export type CommentDocument = HydratedDocument<Comments>;

@Schema({ timestamps: true })
export class Comments {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' ,required: true })
    userId: Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Posts' ,required: true })
    postId: Types.ObjectId;

    @Prop({ required: true })
    content: string;
}

export const CommentsShema = SchemaFactory.createForClass(Comments);