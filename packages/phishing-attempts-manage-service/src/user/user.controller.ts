import { Controller, Post, Body, UnauthorizedException, Res } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./schemas/user.schema";
import { CreateUserDto } from "./dtos/create-user.dto";
import { Public } from "src/auth/public.decorator";

@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Public()
	@Post("register")
	async register(@Body() createUserDto: CreateUserDto): Promise<User> {
		return this.userService.createUser(createUserDto);
	}
}
