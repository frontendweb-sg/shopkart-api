import express, { Router } from "express";
import { body } from "express-validator";
import {
	addPage,
	deletePage,
	getPage,
	getPages,
	updatePage,
} from "../controllers/page";
import { requestValidator } from "../middleware/request-validator";

const route = express.Router();

// page routes
route.get("/", getPages);
route.get("/:pageId", getPage);
route.post(
	"/",
	[
		body("title", "Page name is required!").notEmpty(),
		body("description", "Description name is required!").notEmpty(),
	],
	requestValidator,
	addPage
);
route.put(
	"/:pageId",
	[
		body("title", "Page name is required!").notEmpty(),
		body("description", "Description name is required!").notEmpty(),
	],
	requestValidator,
	updatePage
);
route.delete("/:pageId", deletePage);

// export page route
export { route as pageRoute };
