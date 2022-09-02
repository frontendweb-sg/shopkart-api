import { ValidationError } from "express-validator";
import { CustomError } from "./custome-error";

/**
 * Request validation error
 */
export class RequestValidationError extends CustomError {
	statusCode = 400;
	constructor(public errors: ValidationError[]) {
		super("Invalid request paramters");
		Object.setPrototypeOf(this, RequestValidationError.prototype);
	}
	renderError() {
		return this.errors.map((error) => ({
			message: error.msg,
			status: this.statusCode,
			field: error.param,
		}));
	}
}
