import mongoose, { Document, Schema, Types } from "mongoose";
import { PRODUCT_TABLE_NAME } from "./product";
import { USER_TABLE_NAME } from "./user";

const WISHLIST_TABLE_NAME = "wishlist";
interface IWishlist {
	user: string;
	product: string;
}
interface IWishlistDoc extends IWishlist, Document<IWishlist> {}

const schema = new Schema(
	{
		user: { type: Types.ObjectId, ref: USER_TABLE_NAME, require: true },
		product: { type: Types.ObjectId, ref: PRODUCT_TABLE_NAME, require: true },
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
const Wishlist = mongoose.model<IWishlistDoc>(WISHLIST_TABLE_NAME, schema);
export { Wishlist };
