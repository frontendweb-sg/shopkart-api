import express from "express";
import { body } from "express-validator";
import { addRole, deleteRole, getRoles, updateRole } from "../controllers/role";
import { requestValidator } from "../middleware/request-validator";

const route = express.Router();

route.get("/", getRoles);
route.post(
	"/",
	[body("role", "Role name is required!").not().isEmpty()],
	requestValidator,
	addRole
);
route.put("/:roleId", updateRole);
route.delete("/:roleId", deleteRole);

export { route as roleRoute };
