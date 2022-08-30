import express from "express";
import {
	addCategory,
	deleteCategory,
	getCategories,
	updateCategory,
} from "../controllers/category";

const route = express.Router();

/**
 * Method     :     get
 * URL        :     https://localhost:
 */
route.get("/", getCategories);

route.post("/", addCategory);

route.put("/:categoryId", updateCategory);

route.delete("/:categoryId", deleteCategory);

// export
export { route as categoryRoute };
