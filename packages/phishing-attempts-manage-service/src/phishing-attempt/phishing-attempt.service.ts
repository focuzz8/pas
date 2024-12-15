import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { PhishingAttempt, PhishingAttemptDocument } from "./schemas/phishing-attempt.schema";
import axios from "axios";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class PhishingAttemptService {
	constructor(
		@InjectModel(PhishingAttempt.name)
		private phishingAttemptModel: Model<PhishingAttemptDocument>,
		private readonly configService: ConfigService,
	) {}

	async getAllPhishingAttempts(): Promise<PhishingAttempt[]> {
		return this.phishingAttemptModel.find().exec();
	}

	async createPhishingAttempt(phishingEmailDto: { email: string; subject: string; body: string }): Promise<string> {
		const simulationServiceUrl = this.configService.get("SIMULATION_SERVICE_URL");
		const response = await axios.post(`${simulationServiceUrl}/phishing/send`, {
			email: phishingEmailDto.email,
			subject: phishingEmailDto.subject,
			body: phishingEmailDto.body,
		});
		return response.data.id;
	}
}
