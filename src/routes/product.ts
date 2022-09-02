import express from "express";
import {
	addProduct,
	deleteProduct,
	getProduct,
	getProducts,
	updateProduct,
} from "../controllers/product";

const route = express.Router();

route.get("/", getProducts);
route.get("/:productId", getProduct);
route.post("/", addProduct);
route.put("/:productId", updateProduct);
route.delete("/:productId", deleteProduct);

// export
export { route as productRoute };
