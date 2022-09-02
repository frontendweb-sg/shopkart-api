import express from "express";
import { body } from "express-validator";
import {
	addCategory,
	deleteCategory,
	getCategories,
	updateCategory,
} from "../controllers/category";
import { requestValidator } from "../middleware/request-validator";

const route = express.Router();

/**
 * Method     :     get
 * URL        :     https://localhost:
 */
route.get("/", getCategories);

route.post(
	"/",
	[body("title", "Title is requried!").not().isEmpty()],
	requestValidator,
	addCategory
);

route.put(
	"/:categoryId",
	[body("title", "Title is requried!").not().isEmpty()],
	requestValidator,
	updateCategory
);

route.delete("/:categoryId", deleteCategory);

// export
export { route as categoryRoute };
