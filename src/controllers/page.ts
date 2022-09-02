import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../errors/bad-request-error";
import { Page, IPageDoc } from "../models/page";
import { slugname } from "../utils";
import { EStatus } from "../utils/enums/EStatus";

/**
 * Get all pages
 * @param req
 * @param res
 * @param next
 */
const getPages = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const pages = (await Page.find()) as IPageDoc[];
		return res.status(200).send(pages);
	} catch (error) {
		next(error);
	}
};

/**
 * Get page detail by page id
 * @param req
 * @param res
 * @param next
 * @returns
 */
const getPage = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const pageId = req.params.pageId;
		const page = (await Page.findById(pageId)) as IPageDoc;
		return res.status(200).send(page);
	} catch (error) {
		next(error);
	}
};

/**
 * Add Page
 * @param req
 * @param res
 * @param next
 * @returns
 */
let order = 0;
const addPage = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { title, description, excerpt } = req.body;
		const slug = slugname(title);
		const isPage = await Page.findOne({ slug });
		if (isPage) {
			throw new BadRequestError("Page already existed");
		}

		const page = new Page({
			title,
			description,
			excerpt,
			order: order++,
		});

		const result = await page.save();
		return res.status(201).send(result);
	} catch (error) {
		next(error);
	}
};

/**
 * Update page
 * @param req
 * @param res
 * @param next
 * @returns
 */
const updatePage = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const query = req.query?.query;
		if (query) {
			return await activeInactivePage(req, res, next);
		}

		const pageId = req.params.pageId;
		const { title, description, excerpt } = req.body;

		const result = await Page.findByIdAndUpdate(
			pageId,
			{
				$set: {
					title,
					description,
					excerpt,
				},
			},
			{
				new: true,
			}
		);

		return res.status(201).send(result);
	} catch (error) {
		next(error);
	}
};

/**
 * Delete page
 * @param req
 * @param res
 * @param next
 * @returns
 */
const deletePage = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const pageId = req.params.pageId;
		await Page.findByIdAndDelete(pageId);
		return res.status(200).send({ _id: pageId });
	} catch (error) {
		next(error);
	}
};

const activeInactivePage = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const query = req.query?.query;
		const pageId = req.params.pageId;
		const page = (await Page.findById(pageId)) as IPageDoc;

		if (query === EStatus.publish) {
			page.status = EStatus.publish;
		}

		if (query === EStatus.active) {
			page.active = false;
		}
		if (query === EStatus.inactive) {
			page.active = false;
		}

		const result = await page.save();
		return res.status(200).send(result);
	} catch (error) {
		next(error);
	}
};

export { getPage, getPages, addPage, updatePage, deletePage };
