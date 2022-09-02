import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../errors/bad-request-error";
import { NotFoundError } from "../errors/not-found-error";
import { Color, IColorDoc } from "../models/color";
import { increaseOrder, slugname } from "../utils";

/**
 * All categories
 * @param req
 * @param res
 * @param next
 */
const getColors = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const colors = (await Color.find()) as IColorDoc[];
		return res.status(200).send(colors);
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

const addColor = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const colors = (await Color.find()) as IColorDoc[];
		const { name, hashcode } = req.body;

		const slug = slugname(name);
		const color = (await Color.findOne({ slug })) as IColorDoc;
		if (color) {
			throw new BadRequestError("Color already existed!");
		}

		const newColor = new Color({
			name,
			slug,
			hashcode,
			order: increaseOrder(colors),
		});

		const result = await newColor.save();
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
const updateColor = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const status = req.query?.status;
		if (status) {
			return await activeInactiveColor(req, res, next);
		}

		const { name, hashcode } = req.body;
		const colorId = req.params.colorId;
		const color = await Color.findById(colorId);
		if (!color) {
			throw new NotFoundError("Color not found"!);
		}

		const result = await Color.findByIdAndUpdate(
			{ _id: colorId },
			{
				$set: {
					name,
					hashcode,
					slug: slugname(name),
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
const deleteColor = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const colorId = req.params.colorId;
		const color = await Color.findById(colorId);
		if (!color) {
			throw new NotFoundError("Color not found!");
		}
		await color.remove();
		return res.status(200).send({ _id: colorId });
	} catch (err) {
		next(err);
	}
};

const activeInactiveColor = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const brandId = req.params.brandId;
	const status = req.query?.status;
	try {
		const color = await Color.findById(brandId);

		if (!color) {
			throw new NotFoundError("Color not found!");
		}

		if (status === "active") {
			color.active = true;
		}

		if (status === "inactive") {
			color.active = false;
		}

		await color.save();
		return res.status(200).send(color);
	} catch (err) {
		next(err);
	}
};

// export
export { getColors, addColor, updateColor, deleteColor };
