import { Request, Response, NextFunction } from "express";
import { Product, IProductDoc } from "../models/product";

/**
 * Get all products
 * @param req
 * @param res
 * @param next
 */
const getProducts = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const products = (await Product.find()) as IProductDoc[];
		return res.send(products);
	} catch (error) {
		next(error);
	}
};

/**
 * Get product by id
 * @param req
 * @param res
 * @param next
 * @returns
 */
const getProduct = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const productId = req.params.productId;
		const product = (await Product.findById(productId)) as IProductDoc;
		return res.status(200).send(product);
	} catch (error) {
		next(error);
	}
};
/**
 * Add product
 * @param req
 * @param res
 * @param next
 */
const addProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {};

/**
 * Add product
 * @param req
 * @param res
 * @param next
 */
const updateProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {};

/**
 * Add product
 * @param req
 * @param res
 * @param next
 */
const deleteProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {};

/**
 * Add product
 * @param req
 * @param res
 * @param next
 */
const activeInactiveProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {};

export {
	getProducts,
	addProduct,
	updateProduct,
	deleteProduct,
	activeInactiveProduct,
};
