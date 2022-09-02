import mongoose, { Document, Schema } from "mongoose";

enum Permission {
	read = "read",
	write = "write",
	update = "update",
	delete = "delete",
}

interface IRole {
	role: string;
	slug: string;
	permission: Permission[];
	active: boolean;
}

interface IRoleDoc extends IRole, Document<IRole> {}

const schema = new Schema(
	{
		role: { type: String, require: true },
		slug: { type: String, require: true },
		permission: { type: [String], default: [Permission.read] },
	},
	{
		timestamps: true,
		toJSON: {
			transform(doc, _ret) {
				delete doc.__v;
				delete _ret.__v;
			},
		},
	}
);

// export
const Role = mongoose.model<IRoleDoc>("role", schema);
export { Role, IRoleDoc };
