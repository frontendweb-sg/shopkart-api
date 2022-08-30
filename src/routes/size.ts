import express from "express";
import { getSizes, addSize, updateSize, deleteSize } from "../controllers/size";
import { body } from "express-validator";

// declare route
const route = express.Router();

route.get("/", getSizes);
route.post(
	"/",
	[
		body("idleFor", "Idle for is required!").notEmpty(),
		body("type", "type is required!").notEmpty(),
	],
	addSize
);
route.put(
	"/:sizeId",
	[body("title", "title is required!").notEmpty()],
	updateSize
);
route.delete("/:sizeId", deleteSize);

// export
export { route as sizeRoute };
