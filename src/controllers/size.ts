import { Request, Response, NextFunction } from "express";
import { Size, ISizeDoc } from "../models/size";
import { slugname } from "../utils";

/**
 * All categories
 * @param req
 * @param res
 * @param next
 */
const getSizes = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const sizes = (await Size.find()) as ISizeDoc[];
		return res.status(200).send(sizes);
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
const addSize = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { sizes, idleFor, type } = req.body;

		const slug = slugname(idleFor);

		const size = (await Size.findOne({ slug })) as ISizeDoc;
		if (size) {
			throw new Error("Size already existed!");
		}

		const newSize = new Size({
			sizes,
			slug,
			idleFor,
			type,
		});

		const result = await newSize.save();
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
const updateSize = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const status = req.query?.query;
		if (status) {
			return await activeInactiveSize(req, res, next);
		}
		const { idleFor, sizes, type } = req.body;
		const sizeId = req.params.sizeId;
		const size = await Size.findById(sizeId);
		if (!size) {
			throw new Error("Size not found!");
		}

		const result = await Size.findByIdAndUpdate(
			{ _id: sizeId },
			{
				$set: {
					idleFor,
					sizes,
					type,
					slug: slugname(idleFor),
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
const deleteSize = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const sizeId = req.params.sizeId;
		const size = await Size.findById(sizeId);
		if (!size) {
			throw new Error("Size not found!");
		}
		await Size.remove();
		return res.status(200).send({ _id: sizeId });
	} catch (err) {
		next(err);
	}
};

const activeInactiveSize = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const sizeId = req.params.sizeId;
	const status = req.query?.query;
	try {
		const size = await Size.findById(sizeId);

		if (!size) {
			throw new Error("Size not found!");
		}

		if (status === "active") {
			size.active = true;
		}

		if (status === "inactive") {
			size.active = false;
		}

		await size.save();
		return res.status(200).send(Size);
	} catch (err) {
		next(err);
	}
};

// export
export { getSizes, addSize, updateSize, deleteSize };
