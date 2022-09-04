import mongoose, { Schema, Document, Types } from "mongoose";
import { USER_TABLE_NAME } from "./user";

const ADDRESS_TABLE_NAME = "address";
interface IAddress {
	user: string;
	address: string;
	landmark: string;
	state: string;
	city: string;
	zip: string;
}

interface IAddressDoc extends IAddress, Document<IAddress> {}

const schema = new Schema({
	user: { type: Types.ObjectId, ref: USER_TABLE_NAME, require: true },
	address: { type: String, require: true },
	landmark: { type: String },
	state: { type: String, require: true },
	city: { type: String, require: true },
	zip: { type: String, require: true },
});

const Address = mongoose.model<IAddressDoc>(ADDRESS_TABLE_NAME, schema);
export { Address };
