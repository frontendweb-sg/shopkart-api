import mongoose, { Document, Schema } from "mongoose";
import { IUserDoc } from "./user";

const CATEGORY_TABLE_NAME = "category";
interface ICategory {
	title: string;
	slug: string;
	order: number;
	icon: string;
	active?: boolean;
}

interface ICategoryDoc extends ICategory, Document<ICategory> {}

const schema = new Schema(
	{
		title: { type: String, require: true, trim: true },
		slug: { type: String, require: true, trim: true },
		icon: { type: String, default: 0 },
		active: { type: Boolean, default: true },
		order: { type: Number, default: 0 },
	},
	{
		timestamps: true,
		toJSON: {
			transform(doc, _ret) {
				delete _ret.__v;
				delete doc.__v;
			},
		},
	}
);

const Category = mongoose.model<IUserDoc>(CATEGORY_TABLE_NAME, schema);
export { CATEGORY_TABLE_NAME, Category, ICategoryDoc };
