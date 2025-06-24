import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";

export type LikeDocument = HydratedDocument<Like>;

@Schema()
export class Like {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Posts', required: true })
    postId: Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId;
}

export const LikeShema = SchemaFactory.createForClass(Like);

LikeShema.index({ postId: 1, userId: 1 }, { unique: true });