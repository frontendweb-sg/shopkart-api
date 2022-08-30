import mongoose, { Schema, Document, Model } from "mongoose";

const COLOR_TABLE_NAME = "color";
interface IColor {
	name: string[];
	slug: string;
	hashcode: string;
	active: boolean;
}

interface IColorDoc extends IColor, Document<IColor> {}

const schema = new Schema(
	{
		name: { type: String, require: true },
		slug: { type: String, require: true },
		hashcode: { type: String, require },
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

const Color = mongoose.model<IColorDoc>(COLOR_TABLE_NAME, schema);
export { COLOR_TABLE_NAME, Color, IColorDoc };
