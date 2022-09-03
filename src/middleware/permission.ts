import { Request, Response, NextFunction } from "express";
import { AuthError } from "../errors/auth-error";
import { IRoleDoc, Role } from "../models/role";
import { IUserDoc, User } from "../models/user";

/**
 * Permission middleware
 * @param roles
 * @returns
 */
const permission = [];
export const Permision = (...roles: string[]) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userId = req.user.id;
			const user = (await User.findById(userId)) as IUserDoc;
			const access = roles.includes(user.role);
			if (!access) {
				throw new AuthError("You have no permission for perming this action.");
			}
			// if (access) {
			// 	const role = (await Role.findOne({
			// 		 role: user.role,
			// 	}))as IRoleDoc;

			// 	// ['r','w']
			// }

			next();
		} catch (error) {
			console.log("e", error);
			next(error);
		}
	};
};
