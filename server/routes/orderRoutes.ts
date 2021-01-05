import { Router } from "express";
import { confirmOrder } from "../controllers/orderControllers";

const orderRoutes = (): Router => {
	const router = Router();
	router.post("/new", confirmOrder);
	return router;
};

export default orderRoutes;

/*
Tilausroutet:

Tilaus tarvitsee nämä tiedot:
- user_id

- POST tuotteiden tilaaminen frontin ostoskorista (kirjautunut käyttäjä)
	- tilaus kirjoitetaan tietokantaan järjestyksessä orders --> order_line --> books
	- käyttäjälle näytetään tilauksen tiedot eli serveri lähettää ne frontendille
	- ALV
- GET hae käyttäjän omat tilaukset (kirjautunut käyttäjä)
- GET hae tietyn käyttäjän tilaukset (admin) EXTRA
- POST tuotteen varaaminen (kirjautunut käyttäjä) EXTRA
*/