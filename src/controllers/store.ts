import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../errors/bad-request-error";
import { Store, IStoreDoc } from "../models/store";
import { increaseOrder, slugname } from "../utils";

/**
 * Get all stores
 */
const getStores = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const stores = (await Store.find().sort({ insertAt: -1 })) as IStoreDoc[];
		return res.status(200).send(stores);
	} catch (error) {
		next(error);
	}
};

/**
 * Add store
 */
const addStore = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const stores = (await Store.find()) as IStoreDoc[];

		console.log("stores", stores);
		req.body.slug = slugname(req.body.title);
		req.body.order = increaseOrder(stores);

		console.log(req.body);
		const store = await Store.findOne({ slug: req.body.slug });
		if (store) {
			throw new BadRequestError("Store is already existed!");
		}

		const newStore = new Store(req.body);
		const result = await newStore.save();
		return res.status(201).send(result);
	} catch (error) {
		next(error);
	}
};

/**
 * Update store
 */
const updateStore = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const storeId = req.params.storeId;
		req.body.slug = slugname(req.body.title);

		const store = await Store.findByIdAndUpdate(
			storeId,
			{
				$set: req.body,
			},
			{ next: true }
		);

		return res.status(200).send(store);
	} catch (error) {
		next(error);
	}
};

/**
 * delete store
 */
const deleteStore = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const storeId = req.params.storeId;
		await Store.findByIdAndDelete(storeId);
		return res.status(200).send({ _id: storeId });
	} catch (error) {
		next(error);
	}
};

/**
 * Get all brands
 */
const activeInactiveStore = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id = req.params.id;
		const status = req.query.status;
		const store = (await Store.findById(id)) as IStoreDoc;

		if (!store) {
			throw new BadRequestError("Store not found!");
		}

		if (status === "active") {
			store.active = true;
		}

		if (status === "inactive") {
			store.active = false;
		}

		await store.save();
		return res.status(200).send(store);
	} catch (error) {
		next(error);
	}
};

// Export
export { getStores, addStore, updateStore, deleteStore };
