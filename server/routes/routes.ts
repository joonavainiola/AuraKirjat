import { Router } from "express";
import productRoutes from "./productRoutes";
import userRoutes from "./userRoutes";
import loginRoutes from "./loginRoutes";
import auth from "../middlewares/authMiddleware";
import cartRoutes from "./cartRoutes";
import orderRoutes from "./orderRoutes";
import genreRoutes from "./genreRoutes";
import discountRoutes from "./discountRoutes";
import profileRoutes from "./profileRoutes";
import historyRoutes from "./historyRoutes";

export const createRoutes = (): Router => {
	const router = Router();
	router.use("/products", productRoutes());
	router.use("/users", userRoutes());
	router.use("/login", loginRoutes());
	router.use("/cart", auth, cartRoutes());
	router.use("/order", auth, orderRoutes());
	router.use("/genres", genreRoutes());
	router.use("/discounts", discountRoutes());
	router.use("/profile", auth, profileRoutes());
	router.use("/history", auth, historyRoutes());
	return router;
};
