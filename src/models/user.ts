import mongoose, { Schema, Document, Model } from "mongoose";
import { ERole } from "../utils/enums/ERole";
import { Password } from "../utils/enums/Password";

const USER_TABLE_NAME = "user";

interface IUser {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	mobile: string;
	role: ERole;
	verify?: boolean;
	active?: boolean;
	insertAt?: Date;
}

interface IUserDoc extends IUser, Document<IUser> {}

interface IUserModel extends IUser, Model<IUserDoc> {
	addUser(user: IUser): IUserDoc;
}

const schema = new Schema(
	{
		firstname: { type: String, require: true, trim: true },
		lastname: { type: String, require: true, trim: true },
		email: { type: String, required: true, trim: true, unique: true },
		password: { type: String, require: true },
		mobile: { type: String, require: true },
		role: {
			type: [String],
			default: [ERole.user],
			enum: [ERole.admin, ERole.superadmin, ERole.user],
		},
		active: { type: String, default: true },
		verify: { type: Boolean, default: false },
	},
	{
		timestamps: true,
		toJSON: {
			transform(doc, _ret) {
				delete doc.__v;
				delete _ret.__v;
				delete doc.password;
				delete _ret.password;
			},
		},
	}
);

schema.pre("save", async function (done) {
	if (this.isModified("password")) {
		const password = Password.toHash(this.get("password"));
		this.set("password", password);
	}
	this.set("verify", ["admin", "superadmin"].includes(this.get("role")));
	done();
});

// statics method
schema.statics.addUser = (user: IUser) => new User(user);
const User = mongoose.model<IUserDoc, IUserModel>(USER_TABLE_NAME, schema);
export { USER_TABLE_NAME, IUserDoc, User };
