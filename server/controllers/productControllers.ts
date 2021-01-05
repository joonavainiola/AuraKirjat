import { Request, Response } from "express";
import pool from "../database";
// import { getById } from "../database/controllers/queryFunctions";
import { getRepository, ILike } from "typeorm";
import { Books } from "../database/models/Books";

// search by book name or author
export const searchProducts = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const searchQuery = req.query.search?.toString().toLowerCase();

		const bookRepository = getRepository(Books);
		const books = await bookRepository.find({
			where: [
				{ name: ILike(`%${searchQuery}%`) },
				{ author: ILike(`%${searchQuery}%`) },
			]
		});

		return res.status(200).json(books);
	} catch (err) {
		return res.status(501).json({ error: "Server error" });
	}
};

export const getBookById = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { id } = req.params;
		const bookRepository = getRepository(Books);
		const books = await bookRepository.find({ where: { id } });
		return res.status(200).json(books);
	} catch (err) {
		console.log(err);
		return res.status(501).json({ error: "Server error" });
	}
};

// search by book genre (number)
export const searchProductsByGenre = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const searchQuery = req.query.genre;
	// Genre is a number. Genre names can be defined in front-end.
	// const text = "SELECT * FROM books WHERE genre = $1";
	const text = "SELECT * FROM books WHERE \"genreCode\" = $1";
	const value = [searchQuery];
	try {
		const result = await pool.query(text, value);
		return res.status(200).json(result.rows);
	} catch (err) {
		return res.status(501).json({ error: "Server error" });
	}
};

