import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PhishingAttempt, PhishingAttemptSchema } from "./schemas/phishing-attempt.schema";
import { PhishingAttemptService } from "./phishing-attempt.service";
import { PhishingAttemptController } from "./phishing-attempt.controller";

@Module({
	imports: [MongooseModule.forFeature([{ name: PhishingAttempt.name, schema: PhishingAttemptSchema }])],
	providers: [PhishingAttemptService],
	controllers: [PhishingAttemptController],
	exports: [PhishingAttemptService],
})
export class PhishingAttemptModule {}
