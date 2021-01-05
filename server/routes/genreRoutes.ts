import { Router } from "express";
import { addGenre, deleteGenre, getGenres } from "../controllers/genreControllers";
import auth from "../middlewares/authMiddleware";
import admin from "../middlewares/adminMiddleware";


const genreRoutes = (): Router => {
	const router = Router();
	router.get("/", getGenres);
	router.post("/add", auth, admin, addGenre);
	router.delete("/delete", auth, admin, deleteGenre);
	return router;
};

export default genreRoutes;