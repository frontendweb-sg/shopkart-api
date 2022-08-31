import express, { Router } from "express";
import {
	addPage,
	deletePage,
	getPage,
	getPages,
	updatePage,
} from "../controllers/page";

const route = express.Router();

// page routes
route.get("/", getPages);
route.get("/:pageId", getPage);
route.post("/", addPage);
route.put("/:pageId", updatePage);
route.delete("/:pageId", deletePage);

// export page route
export { route as pageRoute };
