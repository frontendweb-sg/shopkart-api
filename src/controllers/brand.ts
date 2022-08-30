import { Request, Response, NextFunction } from "express";
import { Brand, IBrandDoc } from "../models/brand";
import { slugname } from "../utils";

/**
 * All categories
 * @param req
 * @param res
 * @param next
 */
const getBrands = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const brands = (await Brand.find()) as IBrandDoc[];
		return res.status(200).send(brands);
	} catch (error) {
		next(error);
	}
};

/**
 * Add category
 * @param req
 * @param res
 * @param next
 */
let order = 0;
const addBrand = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { title } = req.body;

		const slug = slugname(title);

		const brand = (await Brand.findOne({ slug })) as IBrandDoc;
		if (brand) {
			throw new Error("Brand already existed!");
		}

		const newBrand = Brand.addBrand({
			title,
			slug,
			order: order++,
		});

		const result = await newBrand.save();
		return res.status(201).send(result);
	} catch (error) {
		next(error);
	}
};

/**
 * Update category
 * @param req
 * @param res
 * @param next
 * @returns
 */
const updateBrand = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const status = req.query?.query;
		if (status) {
			return await activeInactiveBrand(req, res, next);
		}
		const { title } = req.body;
		const brandId = req.params.brandId;
		const brand = await Brand.findById(brandId);
		if (!brand) {
			throw new Error("Brand not found!");
		}

		const result = await Brand.findByIdAndUpdate(
			{ _id: brandId },
			{
				$set: {
					title,
					slug: slugname(title),
				},
			},
			{ new: true }
		);

		return res.status(200).send(result);
	} catch (error) {
		next(error);
	}
};

/**
 *
 * @param req
 * @param res
 * @param next
 */
const deleteBrand = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const brandId = req.params.brandId;
		const brand = await Brand.findById(brandId);
		if (!brand) {
			throw new Error("Brand not found!");
		}
		await brand.remove();
		return res.status(200).send({ _id: brandId });
	} catch (err) {
		next(err);
	}
};

const activeInactiveBrand = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const brandId = req.params.brandId;
	const status = req.query?.query;
	try {
		const brand = await Brand.findById(brandId);

		if (!brand) {
			throw new Error("Brand not found!");
		}

		if (status === "active") {
			brand.active = true;
		}

		if (status === "inactive") {
			brand.active = false;
		}

		await brand.save();
		return res.status(200).send(brand);
	} catch (err) {
		next(err);
	}
};

// export
export { getBrands, addBrand, updateBrand, deleteBrand };
