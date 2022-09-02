import express from "express";
import {
	addStore,
	deleteStore,
	getStores,
	updateStore,
} from "../controllers/store";

const route = express.Router();

// routes
route.get("/", getStores);
route.post("/", addStore);
route.put("/:storeId", updateStore);
route.delete("/:storeId", deleteStore);

//export
export { route as storeRoute };
