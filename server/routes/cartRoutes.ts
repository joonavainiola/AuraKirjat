import { Router } from "express";
import { addProductToCart, deleteProductFromCart, deleteProducts, getCartProductsByUserId } from "../controllers/cartControllers";

const cartRoutes = (): Router => {
	const router = Router();
	router.get("/", getCartProductsByUserId);
	router.post("/add", addProductToCart);
	router.delete("/delete", deleteProductFromCart);
	router.delete("/", deleteProducts);
	return router;
};

export default cartRoutes;