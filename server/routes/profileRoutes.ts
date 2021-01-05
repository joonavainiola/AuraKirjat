import { Router } from "express";
import { getOwnProfile, updateOwnProfile } from "../controllers/profileControllers";
import auth from "../middlewares/authMiddleware";

const profileRoutes = (): Router => {
	const router = Router();
	router.get("/me", auth, getOwnProfile);
	router.patch("/update", auth, updateOwnProfile);
	return router;
};

export default profileRoutes;