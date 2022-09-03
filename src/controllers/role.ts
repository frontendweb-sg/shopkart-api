import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../errors/bad-request-error";
import { Role, IRoleDoc } from "../models/role";
import { slugname } from "../utils";
import { EStatus } from "../utils/enums/EStatus";

/**
 * Get all roles
 * @param req
 * @param res
 * @param next
 */
const getRoles = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const roles = (await Role.find()) as IRoleDoc[];
		return res.status(200).send(roles);
	} catch (error) {
		next(error);
	}
};

/**
 * Add role
 * @param req
 * @param res
 * @param next
 */
const addRole = async (req: Request, res: Response, next: NextFunction) => {
	try {
		console.log();
		req.body.slug = slugname(req.body.role);
		const role = (await Role.findOne({ slug: req.body.slug })) as IRoleDoc;
		if (role) throw new BadRequestError("Role already existed!");

		const newRole = new Role(req.body);
		const result = await newRole.save();

		return res.status(201).send(result);
	} catch (error) {
		next(error);
	}
};

/**
 * Update role
 * @param req
 * @param res
 * @param next
 */
const updateRole = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const roleId = req.params.roleId;

		req.body.slug = slugname(req.body.role);
		const role = await Role.findByIdAndUpdate(
			roleId,
			{
				$set: req.body,
			},
			{
				new: true,
			}
		);

		return res.send(200).send(role);
	} catch (error) {
		next(error);
	}
};

/**
 * Delete role
 * @param req
 * @param res
 * @param next
 */
const deleteRole = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const roleId = req.params.roleId;

		await Role.findByIdAndDelete(roleId);

		return res.status(200).send({ _id: roleId });
	} catch (error) {
		next(error);
	}
};

/**
 * Role active / inactive
 * @param req
 * @param res
 * @param next
 * @returns
 */
const activeInactiveRole = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const roleId = req.params.roleId;
		const status = req.query?.status;

		const role = (await Role.findById(roleId)) as IRoleDoc;

		if (status === EStatus.inactive) {
			role.active = false;
		}

		if (status === EStatus.active) {
			role.active = true;
		}

		await role.save();
		return res.status(200).send(role);
	} catch (error) {
		next(error);
	}
};

export { getRoles, addRole, updateRole, deleteRole, activeInactiveRole };
