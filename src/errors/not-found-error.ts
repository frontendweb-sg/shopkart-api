import { CustomError } from "./custome-error";

/**
 * Not found
 */
export class NotFoundError extends CustomError {
	statusCode = 404;
	constructor(public message: string = "Not found") {
		super(message);
		Object.setPrototypeOf(this, NotFoundError.prototype);
	}
	renderError() {
		return [{ message: this.message, field: this.name }];
	}
}
