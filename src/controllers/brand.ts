import { Request, Response, NextFunction } from "express";
import { AuthError } from "../errors/auth-error";
import { BadRequestError } from "../errors/bad-request-error";
import { NotFoundError } from "../errors/not-found-error";
import { Roles } from "../middleware/role";
import { Brand, IBrandDoc } from "../models/brand";
import { increaseOrder, slugname } from "../utils";

/**
 * All categories
 * @param req
 * @param res
 * @param next
 */
const getBrands = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const brands = (await Brand.find().sort({ order: 1 })) as IBrandDoc[];
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

const addBrand = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const brands = (await Brand.find()) as IBrandDoc[];

		const { title } = req.body;
		const slug = slugname(title);
		const brand = (await Brand.findOne({ slug })) as IBrandDoc;
		if (brand) {
			throw new BadRequestError("Brand already existed!");
		}

		const newBrand = new Brand({
			title,
			slug,
			order: increaseOrder<IBrandDoc>(brands),
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
		const status = req.query?.status;
		if (status) {
			return await activeInactiveBrand(req, res, next);
		}
		const { title } = req.body;

		const brandId = req.params.brandId;
		const brand = await Brand.findById(brandId);
		if (!brand) {
			throw new NotFoundError("Brand not found!");
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
		console.log(error);
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
			throw new NotFoundError("Brand not found!");
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
	const status = req.query?.status;
	try {
		const brand = await Brand.findById(brandId);

		if (!brand) {
			throw new NotFoundError("Brand not found!");
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
