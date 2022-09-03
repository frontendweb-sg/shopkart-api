import express from "express";
import { body } from "express-validator";
import { addRole, deleteRole, getRoles, updateRole } from "../controllers/role";
import { auth } from "../middleware/auth";
import { requestValidator } from "../middleware/request-validator";

const route = express.Router();

route.get("/", getRoles);
route.post(
	"/",
	[body("role", "Role name is required!").not().isEmpty()],
	requestValidator,
	addRole
);
route.put(
	"/:roleId",
	[body("role", "Role name is required!").not().isEmpty()],
	requestValidator,
	auth,
	updateRole
);
route.delete("/:roleId", auth, deleteRole);

export { route as roleRoute };
