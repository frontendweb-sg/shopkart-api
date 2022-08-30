import { Request, Response, NextFunction } from "express";

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
	return res.send({
		message: error.message,
	});
};
