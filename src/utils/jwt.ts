import jwt from "jsonwebtoken";
import { IUserDoc } from "../models/user";

/**
 * JWT
 */
class Jwt {
	static genToken(user: IUserDoc, expire?: string | number) {
		return jwt.sign(
			{ id: user._id, email: user.email, role: user.role },
			process.env.SECRET_KEY!,
			{ expiresIn: expire ?? "1h" }
		);
	}

	static verify(token: string) {
		return jwt.verify(token, process.env.SECRET_KEY!);
	}
}

export { Jwt };
