import mongoose, { Document, Types, Schema } from "mongoose";
import { PRODUCT_TABLE_NAME } from "./product";
import { USER_TABLE_NAME } from "./user";

const ORDER_TABLE_NAME = "order";
interface IOrder {
	product: string;
	product_image: string;
}

interface IOrderDoc extends IOrder, Document<IOrder> {}

const schema = new Schema({
	product: { type: Types.ObjectId, ref: PRODUCT_TABLE_NAME, require: true },
	user: { type: Types.ObjectId, ref: USER_TABLE_NAME, require: true },
	quantity: { type: Number, require: true },
});

const Order = mongoose.model<IOrderDoc>(ORDER_TABLE_NAME, schema);
export { Order, ORDER_TABLE_NAME, IOrderDoc };
