import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

import { PhishingSimulationModule } from "./phishing-simulation/phishing-simulation.module";
import { MailerModule } from "@nestjs-modules/mailer";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ".env",
		}),
		MongooseModule.forRootAsync({
			useFactory: (configService: ConfigService) => ({
				uri: configService.get<string>("MONGO_URI"),
			}),
			inject: [ConfigService],
		}),
		MailerModule.forRoot({
			transport: {
				host: process.env.SMTP_HOST,
				port: Number.parseInt(process.env.SMTP_PORT),
				secure: false,
				auth: {
					user: process.env.SMTP_USER,
					pass: process.env.SMTP_PASSWORD,
				},
				tls: {
					rejectUnauthorized: false,
				},
			},
		}),

		PhishingSimulationModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
