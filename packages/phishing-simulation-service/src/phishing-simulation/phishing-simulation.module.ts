import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PhishingAttempt, PhishingAttemptSchema } from "./schemas/phishing-attempt.schema";
import { PhishingSimulationService } from "./phishing-simulation.service";
import { PhishingSimulationController } from "./phishing-simulation.controller";
import { MailerModule } from "@nestjs-modules/mailer";

@Module({
	imports: [MongooseModule.forFeature([{ name: PhishingAttempt.name, schema: PhishingAttemptSchema }]), MailerModule],
	providers: [PhishingSimulationService],
	controllers: [PhishingSimulationController],
	exports: [PhishingSimulationService],
})
export class PhishingSimulationModule {}
