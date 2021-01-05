import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Users } from "../database/models/Users";
import { getRepository } from "typeorm";

// get user by id
export const getUserById = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { id } = req.params;
		const userRepository = getRepository(Users);
		const user = await userRepository.find({ where: { id } });
		const userInfo = {
			fullName: user[0].full_name,
			email: user[0].email,
			address: user[0].address,
			id: user[0].id
		};
		return res.status(200).json(userInfo);
	} catch (err) {
		console.log(err);
		return res.status(501).json({ error: "Server error" });
	}
};


// post new user to database
export const registerNewUser = async (
	req: Request,
	res: Response,
): Promise<Response> => {
	const { full_name, email, password } = req.body;
	try {
		// Crypting password before it will be saved to database
		const salt = await bcrypt.genSalt(10);
		const cryptedPassword = await bcrypt.hash(password, salt);

		const userRepository = getRepository(Users);
		// Checking if user with this email is already in database
		const existingUser = await userRepository.findOne({ where: { email } });
		if (!existingUser) {
			const newUser = new Users();
			newUser.full_name = full_name;
			newUser.email = email;
			newUser.password = cryptedPassword;
			newUser.address = "";
			newUser.is_admin = false;
			await userRepository.save(newUser);
			return res.status(200).json({ msg: "Your account has been succesfully created." });
		} else return res.status(409).json({ msg: "User is already in database." });
	} catch (err) {
		return res.status(501).json({ error: "Server error" });
	}
};
