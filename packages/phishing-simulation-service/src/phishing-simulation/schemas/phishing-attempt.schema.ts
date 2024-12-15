import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { PhishingAttemptState } from "../state-machine/phishing-attempt-state-machine";

export type PhishingAttemptDocument = PhishingAttempt & Document<string>;

@Schema()
export class PhishingAttempt {
	@Prop()
	recipientEmail: string;

	@Prop()
	subject: string;

	@Prop()
	body: string;

	@Prop({ enum: PhishingAttemptState, default: PhishingAttemptState.CREATED })
	status: string;

	@Prop()
	clickTimestamp?: Date;
}

export const PhishingAttemptSchema = SchemaFactory.createForClass(PhishingAttempt);
