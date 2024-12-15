import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

import { UserModule } from "./user/user.module";
import { PhishingAttemptModule } from "./phishing-attempt/phishing-attempt.module";
import { AuthModule } from "./auth/auth.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		MongooseModule.forRootAsync({
			useFactory: (configService: ConfigService) => ({
				uri: configService.get<string>("MONGO_URI"),
			}),
			inject: [ConfigService],
		}),
		AuthModule,
		UserModule,
		PhishingAttemptModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
