import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { Users } from "../database/models/Users";

const admin = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const id = req.body.user.id;
		if (!id) {
			res.status(401).json({ error: "Unauthorized." });
		}
		const userRepository = getRepository(Users);
		const existingUser = await userRepository.findOne({ where: { id } });
		if (existingUser?.is_admin) {
			next();
		} else res.status(401).json({ error: "Unauthorized." });
	} catch (err) {
		res.status(501).send({ error: "Server error" });
	}
};

export default admin;
