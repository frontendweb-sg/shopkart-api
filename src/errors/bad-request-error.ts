import { CustomError } from "./custome-error";

/**
 * Not found
 */
export class BadRequestError extends CustomError {
	statusCode = 400;
	constructor(public message: string = "Bad requrest") {
		super(message);
		Object.setPrototypeOf(this, BadRequestError.prototype);
	}
	renderError() {
		return [
			{ message: this.message, status: this.statusCode, field: this.name },
		];
	}
}
