import { Controller, Post, Body, Param, Get } from "@nestjs/common";
import { PhishingSimulationService } from "./phishing-simulation.service";

@Controller("phishing")
export class PhishingSimulationController {
	constructor(private readonly phishingSimulationService: PhishingSimulationService) {}

	@Post("send")
	async sendPhishingEmail(@Body() phishingEmailDto: { email: string; subject: string; body: string }): Promise<string> {
		const id = await this.phishingSimulationService.createPhishingEmail(phishingEmailDto.email, phishingEmailDto.subject, phishingEmailDto.body);
		await this.phishingSimulationService.sendPhishingEmail(id, phishingEmailDto.email, phishingEmailDto.subject, phishingEmailDto.body);
		return id;
	}

	@Get("click/:id")
	async handleEmailClick(@Param("id") id: string): Promise<void> {
		await this.phishingSimulationService.handleEmailClick(id);
	}

	@Post("cancel/:id")
	async cancelPhishingEmail(@Param("id") id: string): Promise<void> {
		await this.phishingSimulationService.cancelPhishingEmail(id);
	}
}
