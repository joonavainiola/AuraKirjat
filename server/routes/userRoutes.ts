import { Router } from "express";
import { getUserById, registerNewUser } from "../controllers/userControllers";
import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const userRoutes = (): Router => {
	const router = Router();
	// router.get("/me", getOwnProfile);
	router.get("/:id", getUserById);
	router.post("/", [
		body("email").isEmail()
			.withMessage("Anna sähköpostiosoite oikeassa muodossa."),
		body("full_name").isLength({ min: 2 })
			.withMessage("Nimen täytyy olla vähintään kaksi merkkiä pitkä."),
		body("email").isLength({ min: 5 })
			.withMessage("Sähköpostiosoitteen pitää olla vähintään viisi merkkiä pitkä."),
		body("password").isLength({ min: 5 })
			.withMessage("Salasanan pitää olla vähintään viisi merkkiä pitkä.")
			.matches(/\d/).withMessage("Salasanan täytyy sisältää vähintään yksi numero."),
	], async (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		} return next();
	}, registerNewUser);
	return router;
};

export default userRoutes;