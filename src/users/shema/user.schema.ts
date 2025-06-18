import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongodb";
import mongoose, { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User{
    @Prop({required: true, unique:true})
    userName: string;

    @Prop({required: true, unique:true})
    email:string;

    @Prop()
    password:string;

    @Prop()
    bio:string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], default: [] })
    followers: mongoose.Types.ObjectId[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], default: [] })
    following: mongoose.Types.ObjectId[];
}

export const UserShema =SchemaFactory.createForClass(User);