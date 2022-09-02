import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validator-error";

/**
 * Express validator
 * Validating request
 */
export const requestValidator = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const values = validationResult(req);

	if (!values.isEmpty()) {
		throw new RequestValidationError(values.array());
	}
};
