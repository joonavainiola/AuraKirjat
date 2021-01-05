import { Request, Response, NextFunction } from "express";
import pool from "../database";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { getRepository } from "typeorm";
import { Users } from "../database/models/Users";

export interface IToken {
	data: string,
	iat: number,
	exp: number;
}

const secret = String(process.env.JWT_SECRET);

const auth = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const token = req.headers.authorization;
	if (!token) {
		res.sendStatus(403).json({ error: "Unauthorized." });
	} else
		try {
			const decodedData = jwt.verify(token.split(" ")[1], secret);
			const id = Number((decodedData as IToken).data);
			const userRepository = getRepository(Users);
			const existingUser = await userRepository.findOne({ where: { id } });
			if (existingUser) {
				req.body.user = { id };
				next();
			} else res.status(401).json({ error: "Unauthorized." });
		} catch (err) {
			if (err.name === "JsonWebTokenError") {
				res.status(401).send({ error: "Unauthorized" });
			}
			if (err.name === "TokenExpiredError") {
				res.status(401).send({ error: "Session ended" });
			}
			else res.status(501).send({ error: "Server error" });
		}
};

export default auth;
