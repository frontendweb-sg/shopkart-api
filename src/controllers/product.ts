import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../errors/bad-request-error";
import { Product, IProductDoc } from "../models/product";
import { slugname } from "../utils";

/**
 * Get all products
 * @param req
 * @param res
 * @param next
 */
const getProducts = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const products = (await Product.find()
			.populate("category")
			.populate("brand")) as IProductDoc[];
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
		const product = (await Product.findById(productId)
			.populate("category")
			.populate("brand")) as IProductDoc;
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
const addProduct = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const slug = slugname(req.body.title);
		const product = (await Product.findOne({ slug })) as IProductDoc;
		if (product) {
			throw new BadRequestError("Product already existed!");
		}

		const newProduct = new Product({ ...req.body, slug });

		const result = await (
			await (await newProduct.save()).populate("category")
		).populate("brand");
		return res.status(201).send(result);
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

// export
export { getProducts, getProduct, addProduct, updateProduct, deleteProduct };
