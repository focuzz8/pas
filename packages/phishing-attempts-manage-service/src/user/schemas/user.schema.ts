// src/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document<string>;

@Schema()
export class User {
	@Prop()
	username: string;

	@Prop()
	email: string;

	@Prop()
	password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
