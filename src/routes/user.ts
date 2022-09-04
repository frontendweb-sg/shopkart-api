import express from "express";
import { body } from "express-validator";
import { updateRole } from "../controllers/role";
import { getUser, getUsers } from "../controllers/user";
import { auth } from "../middleware/auth";
import { Permision } from "../middleware/permission";
import { ERole } from "../utils/enums/ERole";

const route = express.Router();

route.get("/", auth, getUsers);
route.get("/me", auth, getUser);
route.put(
	"/role",
	[body("role", "Role is required!").isArray()],
	auth,
	updateRole
);

// route.put("/:id", updateUser);

// route.delete("/:id", deleteUser);

/**
 * Delete user
 * Method     :   put
 *
 */
//route.delete("/:id", deleteUser);

// export
export { route as userRoute };
