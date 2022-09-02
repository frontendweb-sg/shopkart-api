import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../errors/bad-request-error";
import { NotFoundError } from "../errors/not-found-error";
import { Size, ISizeDoc } from "../models/size";
import { increaseOrder, slugname } from "../utils";

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
const addSize = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const sizesList = (await Size.find()) as ISizeDoc[];

		const { sizes, idleFor, type } = req.body;
		const slug = slugname(type);

		const size = (await Size.findOne({ slug })) as ISizeDoc;
		if (size) {
			throw new BadRequestError("Size already existed!");
		}

		const newSize = new Size({
			sizes,
			slug,
			idleFor,
			type,
			order: increaseOrder(sizesList),
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
		const status = req.query?.status;
		if (status) {
			return await activeInactiveSize(req, res, next);
		}
		const { idleFor, sizes, type } = req.body;
		const sizeId = req.params.sizeId;
		const size = await Size.findById(sizeId);
		if (!size) {
			throw new NotFoundError("Size not found!");
		}

		const result = await Size.findByIdAndUpdate(
			{ _id: sizeId },
			{
				$set: {
					idleFor,
					sizes,
					type,
					slug: slugname(type),
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
			throw new NotFoundError("Size not found!");
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
	const status = req.query?.status;
	try {
		const size = await Size.findById(sizeId);

		if (!size) {
			throw new NotFoundError("Size not found!");
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
