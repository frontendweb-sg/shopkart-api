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
import { PermisionLevel } from "../utils/enums/Permission";

// declare route
const route = express.Router();
route.get("/", auth, getBrands);
route.post(
	"/",
	[body("title", "title is required!").notEmpty()],
	requestValidator,
	auth,
	Permision(PermisionLevel.create),
	addBrand
);
route.put(
	"/:brandId",
	[body("title", "title is required!").notEmpty()],
	requestValidator,
	auth,
	Permision(PermisionLevel.update),
	updateBrand
);
route.delete("/:brandId", auth, Permision(PermisionLevel.delete), deleteBrand);

// export
export { route as brandRoute };
