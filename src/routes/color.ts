import express from "express";
import {
	addColor,
	deleteColor,
	updateColor,
	getColors,
} from "../controllers/color";
import { body } from "express-validator";
import { requestValidator } from "../middleware/request-validator";

// declare route
const route = express.Router();

route.get("/", getColors);
route.post(
	"/",
	[
		body("name", "Color name is required!").notEmpty(),
		body("hashcode", "Color code will be valid hashcode!").isLength({
			min: 7,
			max: 7,
		}),
	],
	requestValidator,
	addColor
);
route.put(
	"/:colorId",
	[
		body("name", "Color name is required!").notEmpty(),
		body("hashcode", "Color code will be valid hashcode.").isLength({
			min: 7,
			max: 7,
		}),
	],
	requestValidator,
	updateColor
);
route.delete("/:colorId", deleteColor);

// export
export { route as colorRoute };
