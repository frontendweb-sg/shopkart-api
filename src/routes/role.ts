import express from "express";
import { body } from "express-validator";
import { addRole, deleteRole, getRoles, updateRole } from "../controllers/role";
import { auth } from "../middleware/auth";
import { Permision } from "../middleware/permission";
import { requestValidator } from "../middleware/request-validator";
import { ERole } from "../utils/enums/ERole";

const route = express.Router();

route.get("/", auth, Permision(), getRoles);
route.post(
	"/",
	[body("role", "Role name is required!").not().isEmpty()],
	requestValidator,
	auth,
	Permision(),
	addRole
);
route.put(
	"/:roleId",
	[body("role", "Role name is required!").not().isEmpty()],
	requestValidator,
	auth,
	Permision(),
	updateRole
);
route.delete("/:roleId", auth, Permision(ERole.superadmin), deleteRole);

export { route as roleRoute };
