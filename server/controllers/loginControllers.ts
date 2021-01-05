import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { getRepository } from "typeorm";
import { Users } from "../database/models/Users";

const secret = String(process.env.JWT_SECRET);

// fetches given users information from Users table
export const login = async (
	req: Request,
	res: Response,
): Promise<Response> => {
	const { email, password } = req.body;
	try {
		const userRepository = getRepository(Users);
		const existingUser = await userRepository.findOne({ where: { email } });
		if (existingUser) {
			const isValid = await bcrypt.compare(password, existingUser.password);
			if (isValid) {
				// generating token
				const token = jwt.sign({
					data: existingUser.id,
				}, secret, { expiresIn: 60 * 60 });  // token expires after 60 minutes
				return res.json({ token });
			} else return res.status(501).json({ error: "Unauthorized" });
		} else return res.status(501).json({ error: "Unauthorized" });
	} catch (err) {
		return res.status(501).json({ error: "Server error" });
	}
};

// checks if user has authentication succeeded
export const checkLogin = async (
	req: Request,
	res: Response,
): Promise<Response> => {
	try {
		return res.status(200).json({ msg: "Authentication succeeded" });
	} catch (err) {
		return res.status(501).json({ error: "Server error" });
	}
};