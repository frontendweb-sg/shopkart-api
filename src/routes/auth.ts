import express from "express";
import { signin, signup } from "../controllers/user";

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
route.post("/signup", signup);

// export
export { route as authRoute };
