import { Router } from "express";
import { addDiscount, deleteDiscount, getDiscounts } from "../controllers/discountControllers";


const discountRoutes = (): Router => {
	const router = Router();
	router.get("/", getDiscounts);
	router.post("/add", addDiscount);
	router.delete("/delete", deleteDiscount);
	return router;
};

export default discountRoutes;