import express from "express";
import {
	addBrand,
	deleteBrand,
	getBrands,
	updateBrand,
} from "../controllers/brand";
import { body } from "express-validator";

// declare route
const route = express.Router();

route.get("/", getBrands);
route.post("/", [body("title", "title is required!").notEmpty()], addBrand);
route.put(
	"/:brandId",
	[body("title", "title is required!").notEmpty()],
	updateBrand
);
route.delete("/:brandId", deleteBrand);

// export
export { route as brandRoute };
