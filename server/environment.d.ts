declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DB_PORT: string;
			DB_HOST: string;
			DB_DATABASE: string;
			DB_USERNAME: string;
			DB_PASSWORD: string;
			NODE_ENV: "development" | "production";
			JWT_SECRET: string;
		}
	}
}

export { };