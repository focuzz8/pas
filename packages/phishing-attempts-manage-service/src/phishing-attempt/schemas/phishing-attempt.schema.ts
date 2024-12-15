import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PhishingAttemptDocument = PhishingAttempt & Document<string>;

@Schema()
export class PhishingAttempt {
	@Prop()
	recipientEmail: string;

	@Prop()
	subject: string;

	@Prop()
	body: string;

	@Prop()
	status: string;

	@Prop()
	clickTimestamp?: Date;
}

export const PhishingAttemptSchema = SchemaFactory.createForClass(PhishingAttempt);
