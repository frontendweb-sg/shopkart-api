import mongoose, { Document, Schema } from "mongoose";

const STORE_TABLE_NAME = "store";
interface IStore {
	title: string;
	slug: string;
	active: boolean;
	order: number;
}

interface IStoreDoc extends IStore, Document<IStore> {}

const schema = new Schema(
	{
		title: { type: String, require: true },
		slug: { type: String, require: true },
		order: { type: Number, default: 0 },
		active: { type: Boolean, default: true },
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

const Store = mongoose.model<IStoreDoc>(STORE_TABLE_NAME, schema);
export { Store, IStoreDoc, STORE_TABLE_NAME };
