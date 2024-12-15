import { Controller, Post, Body, UnauthorizedException, Res, HttpStatus, HttpCode, Get } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos/login.dto";
import { Public } from "./public.decorator";
import { JwtPayload } from "./dtos/jwt-payload";

@Controller("auth")
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly jwtService: JwtService,
	) {}

	@Public()
	@HttpCode(HttpStatus.OK)
	@Post("login")
	async login(@Body() loginDto: LoginDto) {
		const userId = await this.authService.validateLogin(loginDto.email, loginDto.password);
		if (!userId) {
			throw new UnauthorizedException();
		}
		const payload: JwtPayload = { sub: userId };
		const token = await this.jwtService.signAsync(payload);

		return { access_token: token };
	}
}
