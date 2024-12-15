import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PhishingAttempt, PhishingAttemptDocument } from "./schemas/phishing-attempt.schema";
import { MailerService } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";
import { PhishingAttemptState, PhishingAttemptStateMachine, stringToPhishingAttemptState } from "./state-machine/phishing-attempt-state-machine";

@Injectable()
export class PhishingSimulationService {
	constructor(
		private readonly mailerService: MailerService,
		private readonly configService: ConfigService,
		@InjectModel(PhishingAttempt.name)
		private readonly phishingAttemptModel: Model<PhishingAttemptDocument>,
	) {}

	async createPhishingEmail(email: string, subject: string, body: string): Promise<string> {
		const newPhishingAttempt = new this.phishingAttemptModel({
			recipientEmail: email,
			subject,
			body,
			status: PhishingAttemptState.CREATED,
		});
		await newPhishingAttempt.save();
		return newPhishingAttempt._id.toString();
	}

	async sendPhishingEmail(id: string, email: string, subject: string, body: string): Promise<void> {
		const trackingLink = `${this.configService.get<string>("BASE_URL")}/phishing/click/${id}`;
		const htmlBody = `${body}<br><a href="${trackingLink}">Click here</a>`;
		await this.mailerService.sendMail({
			from: this.configService.get<string>("SENDER_EMAIL"),
			to: email,
			subject,
			html: htmlBody,
		});

		const phishingAttempt = await this.phishingAttemptModel.findById(id);
		if (phishingAttempt) {
			const stateMachine = new PhishingAttemptStateMachine(stringToPhishingAttemptState(phishingAttempt.status));
			if (stateMachine.transitionTo(PhishingAttemptState.AWAITING)) {
				phishingAttempt.body = htmlBody;
				phishingAttempt.status = stateMachine.getState();
				await phishingAttempt.save();
			}
		}
	}

	async handleEmailClick(id: string): Promise<void> {
		const phishingAttempt = await this.phishingAttemptModel.findById(id);
		if (phishingAttempt) {
			const stateMachine = new PhishingAttemptStateMachine(stringToPhishingAttemptState(phishingAttempt.status));
			if (stateMachine.transitionTo(PhishingAttemptState.TRACKED)) {
				phishingAttempt.status = stateMachine.getState();
				phishingAttempt.clickTimestamp = new Date();
				await phishingAttempt.save();
			}
		}
	}

	async cancelPhishingEmail(id: string): Promise<void> {
		const phishingAttempt = await this.phishingAttemptModel.findById(id);
		if (phishingAttempt) {
			const stateMachine = new PhishingAttemptStateMachine(stringToPhishingAttemptState(phishingAttempt.status));
			if (stateMachine.transitionTo(PhishingAttemptState.CANCELLED)) {
				phishingAttempt.status = stateMachine.getState();
				await phishingAttempt.save();
			}
		}
	}
}
