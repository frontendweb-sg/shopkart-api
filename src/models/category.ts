import mongoose, { Document, Model, Schema } from "mongoose";
import { IUserDoc } from "./user";

const CATEGORY_TABLE_NAME = "category";
interface ICategory {
	title: string;
	slug: string;
	order: number;
	active?: boolean;
}

interface ICategoryDoc extends ICategory, Document<ICategory> {}
interface ICategoryModel extends ICategory, Model<ICategory> {
	addCategory(attr: ICategory): ICategoryDoc;
}

const schema = new Schema(
	{
		title: { type: String, require: true, trim: true },
		slug: { type: String, require: true, trim: true },
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

schema.statics.addCategory = (cat: ICategory) => new Category(cat);
const Category = mongoose.model<IUserDoc, ICategoryModel>(
	CATEGORY_TABLE_NAME,
	schema
);
export { CATEGORY_TABLE_NAME, Category, ICategoryDoc };
