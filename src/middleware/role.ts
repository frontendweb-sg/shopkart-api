import { NextFunction } from "express";
import { AuthError } from "../errors/auth-error";
import { IRoleDoc, Role } from "../models/role";
import { IUser } from "./auth";

/**
 *
 * @param user
 * @returns
 */
export const Roles = async (user: IUser) => {
	const role = (await Role.findOne({ role: user.role })) as IRoleDoc;
	if (!role) {
		throw new AuthError();
	}
	return role;
};
