import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Discounts } from "../database/models/Discounts";
import { Genres } from "../database/models/Genres";

// fetch all lines from Discounts table
export const getDiscounts = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const discountRepository = getRepository(Discounts);
		const discounts = await discountRepository.find();
		return res.status(200).json(discounts);
	} catch (err) {
		console.log(err);
		return res.status(501).json({ error: "Server error" });
	}
};

// insert new line to Discounts table
export const addDiscount = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { code, coefficient, genre } = req.body;
		const genreRepository = getRepository(Genres);
		const existingGenre = await genreRepository.findOne({ where: { code: genre } });
		if (existingGenre) {
			const discountRepository = getRepository(Discounts);
			const existingDiscount = await discountRepository.findOne({ where: { code, genre } });
			if (!existingDiscount) {
				const discount = new Discounts();
				discount.code = code;
				discount.coefficient = coefficient;
				discount.genre = genre;
				const newDiscounts = await discountRepository.save(discount);
				return res.status(200).json({ msg: "New discount added to database", discount: newDiscounts });
			}
			return res.status(409).json({ error: "Discount code already exists in database" });
		}
		return res.status(404).json({ error: "Genre not found in database" });
	}
	catch (err) {
		return res.status(501).json({ error: "Server error" });
	}
};

// deletes all lines of one discount code from Discounts table
export const deleteDiscount = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { code } = req.body;
		const discountRepository = getRepository(Discounts);
		const found = await discountRepository.find({ code });
		if (found[0] !== undefined) {
			const discount = await discountRepository.delete({ code });
			if (discount) {
				return res.status(200).json({ msg: "Discount removed" });
			}
			return res.status(501).json({ error: "Server error" });
		}
		return res.status(404).json({ error: "Discount code not found" });
	}
	catch (err) {
		return res.status(501).json({ error: "Server error" });
	}
};