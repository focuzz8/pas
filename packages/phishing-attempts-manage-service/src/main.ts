import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	// TODO: setup CORS for production
	app.enableCors();

	const configService = app.get(ConfigService);
	const port = configService.get<number>("PORT_MANAGE", 3000);

	await app.listen(port);
}
bootstrap();
