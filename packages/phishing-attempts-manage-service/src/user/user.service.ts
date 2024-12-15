import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
// migrate to argon2 in the future
import * as bcrypt from "bcrypt";
import { Model } from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { CreateUserDto } from "./dtos/create-user.dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UserService {
	constructor(
		private readonly configService: ConfigService,
		@InjectModel(User.name) private userModel: Model<UserDocument>,
	) {}

	async createUser(createUserDto: CreateUserDto): Promise<User> {
		const hashedPassword = await bcrypt.hash(createUserDto.password, this.configService.get("SALT_ROUNDS") || 10);
		const newUser = new this.userModel({
			username: createUserDto.username,
			email: createUserDto.email,
			password: hashedPassword,
		});
		return newUser.save();
	}

	async getUserById(id: string): Promise<User> {
		return this.userModel.findOne({ _id: id });
	}

	async getUserIdByEmail(email: string): Promise<string> {
		const user = await this.userModel.findOne({ email });
		return user._id;
	}
}
