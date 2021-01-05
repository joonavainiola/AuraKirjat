import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Genres } from "../database/models/Genres";

// fetch all lines from Genres table
export const getGenres = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const genreRepository = getRepository(Genres);
		const genres = await genreRepository.find();
		return res.status(200).json(genres);
	} catch (err) {
		console.log(err);
		return res.status(501).json({ error: "Server error" });
	}
};

// add new genre to Genres table
export const addGenre = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { code, finnish_name, english_name } = req.body;
		const genreRepository = getRepository(Genres);
		const existingGenre = await genreRepository.findOne({ where: { code } });
		if (!existingGenre) {
			const genre = new Genres();
			genre.code = code;
			genre.finnish_name = finnish_name;
			genre.english_name = english_name;
			const newGenre = await genreRepository.save(genre);
			return res.status(200).json({ msg: "New genre added to database", genre: newGenre });
		}
		return res.status(409).json({ error: "This genre code is already in database" });
	}
	catch (err) {
		return res.status(501).json({ error: "Server error" });
	}
};

// deletes one genre from Genres table
export const deleteGenre = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { code } = req.body;
		const genreRepository = getRepository(Genres);
		const found = await genreRepository.find({ code });
		if (found[0] !== undefined) {
			const genre = await genreRepository.delete({ code });
			if (genre) {
				return res.status(200).json({ msg: "Genre removed" });
			}
			return res.status(501).json({ error: "Server error" });
		}
		return res.status(404).json({ error: "Genre not found" });
	}
	catch (err) {
		return res.status(501).json({ error: "Server error" });
	}
};
