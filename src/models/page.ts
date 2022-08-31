import mongoose, { Document, Schema } from "mongoose";
import { EStatus } from "../utils/enums/EStatus";

const PAGE_TABLE_NAME = "page";
interface IPage {
	title: string;
	slug: string;
	heroImage: string;
	description: string;
	excerpt: string;
	order: number;
	active: boolean;
	status: string;
}

interface IPageDoc extends IPage, Document<IPage> {}

const schema = new Schema(
	{
		title: { type: String, require: true },
		slug: { type: String, require: true },
		description: { type: String },
		excerpt: { type: String },
		heroImage: { type: String },
		order: { type: Number, default: 0 },
		active: { type: Boolean, default: true },
		status: {
			type: String,
			default: EStatus.pending,
			enum: [EStatus.pending, EStatus.publish],
		},
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

const Page = mongoose.model<IPageDoc>(PAGE_TABLE_NAME, schema);
export { Page, PAGE_TABLE_NAME, IPageDoc };
