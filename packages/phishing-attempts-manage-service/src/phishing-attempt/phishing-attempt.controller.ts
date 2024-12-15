import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { PhishingAttemptService } from "./phishing-attempt.service";
import { PhishingAttempt } from "./schemas/phishing-attempt.schema";

@Controller("phishing")
export class PhishingAttemptController {
	constructor(private readonly phishingAttemptService: PhishingAttemptService) {}

	@Get("attempts")
	async getAllPhishingAttempts(): Promise<PhishingAttempt[]> {
		return this.phishingAttemptService.getAllPhishingAttempts();
	}

	@Post("create")
	async createPhishingAttempt(@Body() phishingEmailDto: { email: string; subject: string; body: string }): Promise<string> {
		const id: string = await this.phishingAttemptService.createPhishingAttempt(phishingEmailDto);
		return id;
	}
}
