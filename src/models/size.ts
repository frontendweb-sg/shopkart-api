import mongoose, { Schema, Document, Model } from "mongoose";

const SIZE_TABLE_NAME = "size";
interface ISize {
	slug: string;
	idleFor: string;
	sizes: string[];
	type: string;
	active: boolean;
	order: number;
}

interface ISizeDoc extends ISize, Document<ISize> {}

const schema = new Schema(
	{
		idleFor: { type: String, require: true },
		slug: { type: String, require: true },
		type: { type: String, require: true },
		sizes: { type: [String], require },
		active: { type: Boolean, default: true },
		order: { type: Number, default: 0 },
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

const Size = mongoose.model<ISizeDoc>(SIZE_TABLE_NAME, schema);
export { SIZE_TABLE_NAME, Size, ISizeDoc };
