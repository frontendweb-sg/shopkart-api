import { Request, Response, NextFunction } from "express";
import { AuthError } from "../errors/auth-error";
import jwt from "jsonwebtoken";
/**
 * Auth middleware
 * @param req
 * @param res
 * @param next
 */
export interface IUser {
	id: string;
	email: string;
	role: string;
}
export const auth = (req: Request, res: Response, next: NextFunction) => {
	const header = req.get("Authorization");

	if (!header) {
		throw new AuthError();
	}

	const token = header.split(" ")[1];
	let verify = null;
	try {
		verify = jwt.verify(token, process.env.SECRET_KEY!) as IUser;
	} catch (error) {
		next(new AuthError());
	}

	req.user = verify!;
	next();
};
