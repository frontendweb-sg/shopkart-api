import { Request, Response, NextFunction } from "express";
import { IUserDoc, User } from "../models/user";
import { ERole } from "../utils/enums/ERole";
import { Password } from "../utils/enums/Password";
import { Jwt } from "../utils/jwt";

/**
 * Sign
 * @param req
 * @param res
 * @param next
 */
const signin = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, password } = req.body;
		const user = (await User.findOne({ email })) as IUserDoc;

		if (!user) {
			throw next(new Error("Email not found, Please register first!"));
		}

		const verify = Password.toCompare(password, user.password);
		if (!verify) {
			throw next(new Error("Password not match!"));
		}

		const token = Jwt.genToken(user);
		const expireTime = new Date().getTime() + 60 * 60 * 1000;

		return res.status(200).send({
			token,
			expireTime: new Date(expireTime).toLocaleString(),
			user: user,
		});
	} catch (error) {
		next(error);
	}
};

/**
 * Signup
 * @param req
 * @param res
 * @param next
 * @returns
 */
const signup = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { firstname, lastname, email, password, mobile, role } = req.body;
		const user = (await User.findOne({ email })) as IUserDoc;

		console.log("admin", req.body);

		if (user) {
			throw next(new Error("Email already existed!"));
		}

		const newUser = User.addUser({
			firstname,
			lastname,
			email,
			password,
			mobile,
			role: role ?? ERole.user,
		}) as IUserDoc;

		const result = (await newUser.save()) as IUserDoc;
		return res.status(201).send(result);
	} catch (error) {
		next(error);
	}
};

const forgotPassword = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userId = "";
	const user = (await User.findById(userId)) as IUserDoc;

	if (!user) {
		throw new Error("Email not found!");
	}

	user.password = Password.toHash(req.body);
};

// export
export { signin, signup, forgotPassword };
