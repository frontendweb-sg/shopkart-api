interface IUser {
	id: string;
	email: string;
	role: string;
}
declare namespace Express {
	export interface Request {
		user: IUser;
	}
}
