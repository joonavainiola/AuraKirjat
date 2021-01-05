import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Books } from "../database/models/Books";
import { Shopping_carts } from "../database/models/Shopping_carts";
import { Users } from "../database/models/Users";

// fetch shopping_cart information, gets user id as a parameter
export const getCartProductsByUserId = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const id = req.body.user.id;
		const cartRepository = getRepository(Shopping_carts);
		const books = await cartRepository.find({
			where: { user: id },
			relations: ["book"]
		});
		return res.status(200).json(books);
	} catch (err) {
		console.log(err);
		return res.status(501).json({ error: "Server error" });
	}
};

// add new product to shopping cart
export const addProductToCart = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { book_id } = req.body;
		const id = Number(book_id);
		const user_id = req.body.user.id;
		const bookRepository = getRepository(Books);
		const book = await bookRepository.findOne({ where: { id } });
		if (book) {
			const cartRepository = getRepository(Shopping_carts);
			const cart = new Shopping_carts();
			cart.book = book;
			cart.user = user_id;
			cart.price = book.price;
			cart.std_price = book.price;
			cart.quantity = 1;
			const newProduct = await cartRepository.save(cart);
			return res.status(200).json({ msg: "Product added to shopping cart", product: newProduct });
		}
		return res.status(501).json({ error: "Server error" });
	}
	catch (err) {
		return res.status(501).json({ error: "Server error" });
	}
};

// remove one product from shopping cart
export const deleteProductFromCart = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { cart_id } = req.body;
		const id = Number(cart_id);
		const cartRepository = getRepository(Shopping_carts);
		const found = await cartRepository.find({ id });
		if (found[0] !== undefined) {
			const book = await cartRepository.delete({ id });
			if (book) {
				return res.status(200).json({ msg: "Product removed shopping cart" });
			}
			return res.status(501).json({ error: "Server error" });
		}
		return res.status(404).json({ error: "Shopping cart item not found" });
	}
	catch (err) {
		return res.status(501).json({ error: "Server error" });
	}
};

// remove all products of user by user id from shopping cart
export const deleteProducts = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const userId = req.body.user.id;
		const cartRepository = getRepository(Shopping_carts);
		const userRepository = getRepository(Users);
		const user = await userRepository.findOne({ id: userId });
		const found = await cartRepository.find({ user });
		if (found[0] !== undefined) {
			const book = await cartRepository.delete({ user });
			if (book) {
				return res.status(200).json({ msg: "Products removed from shopping cart" });
			}
			return res.status(501).json({ error: "Server error" });
		}
		return res.status(404).json({ error: "Shopping cart items not found" });
	}
	catch (err) {
		return res.status(501).json({ error: "Server error" });
	}
};
