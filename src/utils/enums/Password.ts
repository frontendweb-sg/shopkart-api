import bcrypt from "bcryptjs";

/**
 * Password class
 */
export class Password {
	// generate hash password
	static toHash(password: string) {
		return bcrypt.hashSync(password, 12);
	}

	// compare hash password to password
	static toCompare(password: string, hashPassword: string) {
		return bcrypt.compareSync(password, hashPassword);
	}
}
