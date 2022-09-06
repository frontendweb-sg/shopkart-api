import express from "express";
import { body } from "express-validator";
import { signin, signup } from "../controllers/auth";
import { BadRequestError } from "../errors/bad-request-error";
import { requestValidator } from "../middleware/request-validator";
import { User } from "../models/user";

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
		body("email", "Email is required!")
			.notEmpty()
			.custom(async (value) => {
				const user = await User.findOne({ email: value });
				if (user) {
					throw new BadRequestError("Email already existed!");
				}
				return user;
			}),
		body("password", "Password is required!").notEmpty(),
		body("mobile", "Mobile is required!").notEmpty(),
	],
	requestValidator,
	signup
);

// export
export { route as authRoute };
