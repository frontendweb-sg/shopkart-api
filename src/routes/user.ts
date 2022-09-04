import express from "express";
import { body } from "express-validator";
import { updateRole } from "../controllers/role";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user";
import { auth } from "../middleware/auth";
import { Permision } from "../middleware/permission";

const route = express.Router();

route.get("/", auth, Permision(), getUsers);
route.get("/me", auth, getUser);
route.put(
	"/role",
	[body("role", "Role is required!").isArray()],
	auth,
	Permision(),
	updateRole
);
route.put("/:userId", auth, updateUser);
route.delete("/:id", auth, Permision(), deleteUser);

// export
export { route as userRoute };
