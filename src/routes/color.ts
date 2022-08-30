import express from "express";
import {
	addColor,
	deleteColor,
	updateColor,
	getColors,
} from "../controllers/color";
import { body } from "express-validator";

// declare route
const route = express.Router();

route.get("/", getColors);
route.post(
	"/",
	[
		body("name", "color name is required!").notEmpty(),
		body("hashcode", "color code is required!").notEmpty(),
	],
	addColor
);
route.put(
	"/:colorId",
	[
		body("name", "color name is required!").notEmpty(),
		body("hashcode", "color code is required!")
			.notEmpty()
			.isLength({ min: 7, max: 7 }),
	],
	updateColor
);
route.delete("/:colorId", deleteColor);

// export
export { route as colorRoute };
