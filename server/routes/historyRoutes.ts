import { Router } from "express";
import { getOrderHistory } from "../controllers/historyControllers";
import auth from "../middlewares/authMiddleware";

const historyRoutes = (): Router => {
	const router = Router();
	router.get("/", auth, getOrderHistory);
	return router;
};

export default historyRoutes;