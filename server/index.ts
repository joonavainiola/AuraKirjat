import express from "express";
import cors from "cors";
import { createRoutes } from "./routes/routes";
import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import "dotenv/config";
import { Books } from "./database/models/Books";
import { Users } from "./database/models/Users";
import { Order_lines } from "./database/models/Order_lines";
import { Orders } from "./database/models/Orders";
import { Shopping_carts } from "./database/models/Shopping_carts";
import { Discounts } from "./database/models/Discounts";
import { Genres } from "./database/models/Genres";

const app = express();

if (process.env.NODE_ENV === "development") {
	app.use(cors({
		origin: "http://localhost:3000",
		credentials: true,
		methods: "GET, PUT, POST, PATCH, DELETE"
	}));
}

const port = 5000;

app.use(express.json());

app.use("/api", createRoutes());

app.get("/", (_req, res) => res.send("Server is up."));

app.listen(port, () => {
	console.log(`Server is running on port ${port}.`);
});


const config: PostgresConnectionOptions = {
	type: "postgres",
	host: String(process.env.DB_HOST),
	port: Number(process.env.DB_PORT),
	username: String(process.env.DB_USERNAME),
	password: String(process.env.DB_PASSWORD),
	database: String(process.env.DB_DATABASE),
	synchronize: true,
	logging: false,
	entities: [
		Users,
		Books,
		Order_lines,
		Orders,
		Shopping_carts,
		Genres,
		Discounts
	]
};


createConnection(config).then(async () => {
	console.log("Server is connected to database.");
}).catch(e => console.log(e));