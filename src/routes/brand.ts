import express from "express";
import {
	addBrand,
	deleteBrand,
	getBrands,
	updateBrand,
} from "../controllers/brand";
import { body } from "express-validator";
import { requestValidator } from "../middleware/request-validator";
import { auth } from "../middleware/auth";
import { Permision } from "../middleware/permission";

// declare route
const route = express.Router();
route.get("/", auth, Permision("admin", "superadmin", "editor"), getBrands);
route.post(
	"/",
	[body("title", "title is required!").notEmpty()],
	requestValidator,
	auth,
	Permision("admin", "superadmin"),
	addBrand
);
route.put(
	"/:brandId",
	[body("title", "title is required!").notEmpty()],
	requestValidator,
	auth,
	Permision("admin", "superadmin", "editor"),
	updateBrand
);
route.delete("/:brandId", auth, Permision("superadmin"), deleteBrand);

// export
export { route as brandRoute };
