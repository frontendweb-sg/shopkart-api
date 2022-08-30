import mongoose, { Document, Model, Schema } from "mongoose";
import { IUserDoc } from "./user";

const BRAND_TABLE_NAME = "brand";
interface IBrand {
	title: string;
	slug: string;
	order: number;
	active?: boolean;
}

interface IBrandDoc extends IBrand, Document<IBrand> {}
interface IBrandModel extends IBrand, Model<IBrand> {
	addBrand(attr: IBrand): IBrandDoc;
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

schema.statics.addBrand = (cat: IBrandDoc) => new Brand(cat);
const Brand = mongoose.model<IBrandDoc, IBrandModel>(BRAND_TABLE_NAME, schema);
export { BRAND_TABLE_NAME, Brand, IBrandDoc };
