import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custome-error";

/**
 * Error Handler middleware
 * @param error
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const errorHandler = (
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log("e", error instanceof CustomError, error.message);
	if (error instanceof CustomError) {
		return res.status(error.statusCode).send({ errors: error.renderError() });
	}
	return res.send({
		message: "Something went worng!",
	});
};
