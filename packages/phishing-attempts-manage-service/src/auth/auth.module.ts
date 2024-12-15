import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { User, UserSchema } from "src/user/schemas/user.schema";
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { UserModule } from "src/user/user.module";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { PassportModule } from "@nestjs/passport";

@Module({
	imports: [
		ConfigModule,
		UserModule,
		PassportModule,
		JwtModule.registerAsync({
			useFactory: (configService: ConfigService) => ({
				secret: configService.get<string>("JWT_SECRET"),
				signOptions: { expiresIn: "8h" },
			}),
			inject: [ConfigService],
		}),
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
	],
	providers: [
		AuthService,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
		JwtStrategy,
	],
	controllers: [AuthController],
	exports: [AuthService],
})
export class AuthModule {}
