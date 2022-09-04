import { Request, Response, NextFunction } from "express";
import { IUserDoc, User, USER_TABLE_NAME } from "../models/user";
import { ERole } from "../utils/enums/ERole";
import { Password } from "../utils/enums/Password";
import { Jwt } from "../utils/jwt";

/**
 * Get all users
 * @param req
 * @param res
 * @param next
 */
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const users = (await User.find()) as IUserDoc[];
		return res.status(200).send(users);
	} catch (error) {
		next(error);
	}
};

/**
 * Get user
 * @param req
 * @param res
 * @param next
 * @returns
 */
const getUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const users = (await User.findById(req.user.id)) as IUserDoc;
		console.log("user", users);
		return res.status(200).send(users);
	} catch (error) {
		next(error);
	}
};

/**
 * update user
 * @param req
 * @param res
 * @param next
 * @returns
 */
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { firstname, lastname } = req.body;
	} catch (error) {
		next(error);
	}
};

/**
 * Update user role
 * @param req
 * @param res
 * @param next
 * @returns
 */
const updateUserRole = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const userId = req.user.id;
		const user = await User.findByIdAndUpdate(
			userId,
			{
				$set: { role: req.body.role },
			},
			{
				new: true,
			}
		);

		return res.status(200).send(user);
	} catch (error) {
		next(error);
	}
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const users = await User.find();
		return res.send(users);
	} catch (error) {
		next(error);
	}
};

// export
export { getUser, getUsers, updateUserRole, updateUser, deleteUser };
