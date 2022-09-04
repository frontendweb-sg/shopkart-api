import { Request, Response, NextFunction } from "express";
import { AuthError } from "../errors/auth-error";
import { IRoleDoc, Role } from "../models/role";
import { IUserDoc, User } from "../models/user";

/**
 * Permission middleware
 * @param roles
 * @returns
 */
export const Permision = (accessFlag: string, restrictUser?: string | null) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const role = req.user.role;
			const roles = (await Role.findOne({ role: role })) as IRoleDoc;
			const access = roles.permission.includes(accessFlag);

			if (!access || role !== "user") {
				throw new AuthError("You have no permission for perming this action.");
			}

			next();
		} catch (error) {
			next(error);
		}
	};
};
