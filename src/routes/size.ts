import express from "express";
import { getSizes, addSize, updateSize, deleteSize } from "../controllers/size";
import { body } from "express-validator";
import { requestValidator } from "../middleware/request-validator";

// declare route
const route = express.Router();

route.get("/", getSizes);
route.post(
	"/",
	[
		body("idleFor", "Idle for is required!").notEmpty(),
		body("type", "type is required!").notEmpty(),
	],
	requestValidator,
	addSize
);
route.put(
	"/:sizeId",
	[
		body("idleFor", "title is required!").notEmpty(),
		body("type", "type is required!").notEmpty(),
	],
	requestValidator,
	updateSize
);
route.delete("/:sizeId", deleteSize);

// export
export { route as sizeRoute };
