import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({
	user: String(process.env.DB_USERNAME),
	host: String(process.env.DB_HOST),
	database: String(process.env.DB_DATABASE),
	password: String(process.env.DB_PASSWORD),
	port: Number(process.env.DB_PORT)
});

pool.on("error", (error, client) => {
	console.error("Unexpected error on idle client", error);
	process.exit(-1);
});

export default pool;