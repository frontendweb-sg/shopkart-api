import express from "express";
import { getUsers, signin, signup } from "../controllers/user";

const route = express.Router();

route.get("/", getUsers);

// route.get("/:id", getUserById);

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
