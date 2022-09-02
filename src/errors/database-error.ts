import { CustomError } from "./custome-error";

/**
 * Database error
 */
export class DatabaseError extends CustomError {
	statusCode = 500;
	constructor(public message: string = "Database connection error") {
		super(message);
		Object.setPrototypeOf(this, DatabaseError.prototype);
	}
	renderError() {
		return [{ message: this.message, field: this.name }];
	}
}
