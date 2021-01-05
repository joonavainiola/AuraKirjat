import { Request, Response } from "express";
// import bcrypt from "bcrypt";
import { Users } from "../database/models/Users";
import { getRepository } from "typeorm";

// get currently logged in users user information
export const getOwnProfile = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const id = req.body.user.id;
		const userRepository = getRepository(Users);
		const user = await userRepository.find({ where: { id } });
		const userInfo = {
			fullName: user[0].full_name,
			email: user[0].email,
			phone: user[0].phone,
			address: user[0].address,
			postalCode: user[0].postal_code,
			id: user[0].id
		};
		return res.status(200).json(userInfo);
	} catch (err) {
		console.log(err);
		return res.status(501).json({ error: "Server error" });
	}
};

// update currently logged in user's user informmation
export const updateOwnProfile = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { full_name, phone, address, postal_code } = req.body;
		const id = req.body.user.id;
		const userRepository = getRepository(Users);
		const user = await userRepository.find({ where: { id } });
		if (user) {
			userRepository.update({ id }, { full_name: full_name, phone: phone, address: address, postal_code: postal_code });

			return res.status(200).json("User Profile updated");
		}
		else {
			return res.status(501).json({ error: "Database error" });
		}
	} catch (err) {
		console.log(err);
		return res.status(501).json({ error: "Server error" });
	}
};
