export abstract class CustomError extends Error {
	abstract statusCode: number;
	constructor(public msg: string) {
		super(msg);
		Object.setPrototypeOf(this, CustomError.prototype);
	}
	abstract renderError(): {
		message: string;
		status?: number;
		field?: string;
	}[];
}
