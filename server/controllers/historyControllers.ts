import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Orders } from "../database/models/Orders";
import { Order_lines } from "../database/models/Order_lines";
import { Users } from "../database/models/Users";

// get current inlogged user's order history
export const getOrderHistory = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		// giving user an information about ordered products and orders
		const id = req.body.user.id;
		const userRepository = getRepository(Users);
		const user = await userRepository.findOne({ where: { id } });

		// if user found, search his/her orders
		if (user) {
			const userId = user;
			const orderRepository = getRepository(Orders);
			const orders = await orderRepository.find({ user: userId });

			// search then belonging orderlines for every order
			if (orders) {
				const orderLinesRepository = getRepository(Order_lines);
				const maxInd = orders.length - 1;
				const orderHistory = [];

				// loop for orderlines
				for (let ind = 0; ind < orders.length; ind++) {
					const orderedProducts = await orderLinesRepository.find({ where: { order: orders[ind].id } });

					// when orderlines found, collect them to an array for later use of return-clause
					if (orderedProducts) {
						orderHistory.push(orderedProducts);

						// when every orders and lines are founded, return data to the client
						// orderHistory includes besides orderlines, also connecting order and book information
						if (ind === maxInd || ind > maxInd)
							return res.status(200).json(
								{
									msg: "History of orderlines founded",
									userId: user.id,
									userName: user.full_name,
									orderHistory
								});
					}
					else {
						return res.status(501).json({ error: "Database error, order lines" });
					}
				}
				// console.log("database error history orders");
				return res.status(501).json({ error: "No orderhistory for user found" });
			}
			else {
				// console.log("database error orders");
				return res.status(501).json({ error: "Database error, orders" });
			}
		}
		else {
			//console.log("databse error user");
			return res.status(501).json({ error: "Database error, user" });
		}

	} catch (err) {
		return res.status(501).json({ error: "Server error" });
	}
};
