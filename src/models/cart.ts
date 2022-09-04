import mongoose, { Document, Types, Schema } from "mongoose";

import { PRODUCT_TABLE_NAME } from "./product";

const CART_TABLE_NAME = "cart";
interface ICart {
	user: string;
	product: string;
	quantity: number;
}

interface ICardDoc extends ICart, Document<ICart> {}

const schema = new Schema(
	{
		user: { type: Types.ObjectId, require: true, ref: CART_TABLE_NAME },
		product: { type: Types.ObjectId, require: true, ref: PRODUCT_TABLE_NAME },
		quantity: { type: Number, default: 0 },
	},
	{
		timestamps: true,
		expireAfterSeconds: 86400,
		toJSON: {
			transform(doc, _ret) {
				delete doc.__v;
				delete _ret.__v;
			},
		},
	}
);

const Cart = mongoose.model<ICardDoc>(CART_TABLE_NAME, schema);
export { Cart, CART_TABLE_NAME, ICardDoc };
