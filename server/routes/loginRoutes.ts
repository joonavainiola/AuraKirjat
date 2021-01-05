import { Router } from "express";
import { login, checkLogin } from "../controllers/loginControllers";
import auth from "../middlewares/authMiddleware";

const userRoutes = (): Router => {
	const router = Router();
	router.post("/", login);
	router.get("/", auth, checkLogin);
	return router;
};

export default userRoutes;