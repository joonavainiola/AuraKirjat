import { Request, Response } from "express";
import { getManager, getRepository } from "typeorm";
// import { Books } from "../database/models/Books";
import { Orders } from "../database/models/Orders";
import { Order_lines } from "../database/models/Order_lines";
import { Shopping_carts } from "../database/models/Shopping_carts";
import { Users } from "../database/models/Users";

// moves products by user from shoppingcart and create orders of them
// deletes handled productlines from shopping cart
export const confirmOrder = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { delivery_address, postal_code, delivery_method } = req.body;
		const id = req.body.user.id;
		const cartRepository = getRepository(Shopping_carts);
		const products = await cartRepository.find({ where: { user: id } });
		if (products.length === 0) {
			return res.status(501).json({ error: "Shopping cart is empty" });
		}
		const values = products.map(product => (product.quantity * product.price));
		let sum = 0;
		values.forEach(value => {
			sum = sum + value;
		});
		const newOrder = new Orders();
		const today = new Date();
		const dateMilliseconds = today.getTime();
		const orderId = `${id}${dateMilliseconds}`;
		const userRepository = getRepository(Users);
		const user = await userRepository.findOne({ where: { id } });
		if (user) {
			// updating delivery address and postal code to user table
			userRepository.update({ id }, { address: delivery_address, postal_code: postal_code });
			const discount_code = user.discount_code;
			// writing new order and orderlines
			newOrder.id = orderId;
			newOrder.delivery_address = delivery_address;
			newOrder.postal_code = postal_code;
			newOrder.delivery_method = delivery_method;
			newOrder.total_sum = sum;
			newOrder.user = user;
			newOrder.order_time = new Date().toLocaleString();
			const orderLines: Order_lines[] = [];
			products.forEach(product => {
				const orderLine = new Order_lines();
				orderLine.order = newOrder;
				orderLine.book = product.book;
				orderLine.price = product.price;
				orderLine.std_price = product.std_price;
				orderLine.quantity = product.quantity;
				orderLine.discount_code = discount_code;
				orderLines.push(orderLine);
			});
			// makes actually updating to database
			await getManager().transaction(async transactionalEntityManager => {
				await transactionalEntityManager.save(newOrder);
				await transactionalEntityManager.save(orderLines);
			});
			// giving user an information about ordered products and order
			const orderLinesRepository = getRepository(Order_lines);
			const orderRepository = getRepository(Orders);
			const order = await orderRepository.findOne({ id: orderId });
			const orderedProducts = await orderLinesRepository.find({ where: { order } });
			if (orderedProducts) {
				const orderInfo = {
					order_id: newOrder.id,
					delivery_address: newOrder.delivery_address,
					delivery_method: newOrder.delivery_method,
					total_sum: newOrder.total_sum,
					products: orderedProducts
				};
				const userId = req.body.user.id;
				const cartRepository = getRepository(Shopping_carts);
				const userRepository = getRepository(Users);

				const user = await userRepository.findOne({ id: userId });
				const found = await cartRepository.find({ user });
				if (found[0] !== undefined) {
					const books = await cartRepository.delete({ user });
					// shoppingCart value true means that shopping cart is empty after order
					if (books) {
						return res.status(200).json(
							{
								msg: "Order succesfully created",
								orderInfo,
								shoppingCart: true
							});
					}
					return res.status(200).json(
						{
							msg: "Order succesfully created",
							orderInfo,
							shoppingCart: false
						});
				} return res.status(200).json(
					{
						msg: "Order succesfully created",
						orderInfo,
						shoppingCart: true
					});

			} return res.status(501).json({ error: "Database error" });
		} return res.status(501).json({ error: "Database error" });
	} catch (err) {
		return res.status(501).json({ error: "Server error" });
	}
};
