import mongoose, { Document, Types, Schema } from "mongoose";

const ORDER_TABLE_NAME = "order";
interface IOrder {
	product_title: string;
	product_image: string;
}

interface IOrderDoc extends IOrder, Document<IOrder> {}

const schema = new Schema({});

const Order = mongoose.model<IOrderDoc>(ORDER_TABLE_NAME, schema);
export { Order, ORDER_TABLE_NAME, IOrderDoc };
