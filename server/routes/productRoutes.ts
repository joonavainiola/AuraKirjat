import { Router } from "express";
import { searchProducts, searchProductsByGenre, getBookById } from "../controllers/productControllers";


const productRoutes = (): Router => {
	const router = Router();
	router.get("/", searchProducts);
	router.get("/genres", searchProductsByGenre);
	router.get("/:id", getBookById);
	return router;
};

export default productRoutes;