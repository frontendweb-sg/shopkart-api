import express from "express";
import { body } from "express-validator";
import { signin, signup } from "../controllers/auth";
import { requestValidator } from "../middleware/request-validator";

const route = express.Router();

/**
 * Method               GET
 * Access               Public
 * Url                  https://localhost:4200/api/auth
 */
route.post("/", signin);

/**
 * Method               GET
 * Access               Public
 * Url                  https://localhost:4200/api/auth/signup
 */
route.post(
	"/signup",
	[
		body("firstname", "First name is required!").notEmpty(),
		body("lastname", "Last name is required!").notEmpty(),
		body("email", "Email is required!").notEmpty(),
		body("password", "Password is required!").notEmpty(),
		body("mobile", "Mobile is required!").notEmpty(),
	],
	requestValidator,
	signup
);

// export
export { route as authRoute };
