import mongoose, { Schema, Document } from "mongoose";
import { BRAND_TABLE_NAME } from "./brand";
import { CATEGORY_TABLE_NAME } from "./category";

const PRODUCT_TABLE_NAME = "product";
interface IProduct {
	category: string;
	brand: string;
	title: string;
	slug: string;
	image: string[];
	description: string;
	excerpt: string;
	idleFor: string;
	color: string[];
	size: string[];
	cost_price: number;
	selling_price: number;
	offer_price: number;
	discount: number;
	stock: number;
	active: boolean;
	status: string;
}

interface IProductDoc extends IProduct, Document<IProduct> {}

const schema = new Schema(
	{
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: CATEGORY_TABLE_NAME,
			default: null,
		},
		brand: {
			type: mongoose.Schema.Types.ObjectId,
			ref: BRAND_TABLE_NAME,
			default: null,
		},
		title: { type: String, require: true },
		slug: { type: String, require: true },
		description: { type: String },
		excerpt: { type: String },
		idleFor: { type: String },
		color: { type: [String] },
		size: { type: [String] },
		stock: { type: Number, default: 0 },
		cost_price: { type: Number, default: 0 },
		selling_price: { type: Number, default: 0 },
		offer_price: { type: Number, default: 0 },
		descount: { type: Number, default: 0 },
		images: { type: [String] },
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

const Product = mongoose.model<IProductDoc>(PRODUCT_TABLE_NAME, schema);
export { PRODUCT_TABLE_NAME, IProductDoc, Product };
