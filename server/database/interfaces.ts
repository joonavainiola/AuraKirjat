export interface IBook {
	id: number,
	name: string,
	description: string,
	price: number,
	author: string,
	published: number,
	form: number,
	genre: number,
	pages: number,
	publisher: string,
	language: string,
	stock_qty: number,
	path: string;
}

export interface IUser {
	id: number,
	full_name: string,
	email: string,
	password: string,
	is_admin: boolean,
	address: string;
}