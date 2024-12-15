import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
// TODO: migrate to argon2 in the future
import * as bcrypt from "bcrypt";
import { Model } from "mongoose";
import { User, UserDocument } from "src/user/schemas/user.schema";

@Injectable()
export class AuthService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

	async validateLogin(email: string, password: string): Promise<string | null> {
		const user = await this.userModel.findOne({ email });
		if (user && bcrypt.compare(user.password, password)) {
			return user._id;
		}
		return null;
	}
}
