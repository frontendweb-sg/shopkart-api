import { CustomError } from "./custome-error";

/**
 * Auth Error
 */
export class AuthError extends CustomError {
	statusCode = 401;

	constructor(public message: string = "Unauthorized error!") {
		super(message);
		Object.setPrototypeOf(this, AuthError.prototype);
	}

	renderError() {
		return [{ message: this.message, field: this.name }];
	}
}