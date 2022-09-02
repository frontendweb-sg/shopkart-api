import mongoose, { Document, Schema } from "mongoose";

const BRAND_TABLE_NAME = "brand";
interface IBrand {
	title: string;
	slug: string;
	order: number;
	active?: boolean;
}

interface IBrandDoc extends IBrand, Document<IBrand> {}

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

const Brand = mongoose.model<IBrandDoc>(BRAND_TABLE_NAME, schema);
export { BRAND_TABLE_NAME, Brand, IBrandDoc };
