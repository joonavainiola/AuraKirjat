import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Genres } from "./Genres";

@Entity()
export class Books {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		unique: true
	})
	product_code: string;

	@Column()
	name: string;

	@Column()
	description: string;

	@Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
	price: number;

	@Column()
	author: string;

	@Column()
	published: number;

	@Column()
	form: number;

	// @Column()
	// genre: number;

	@ManyToOne(() => Genres, genre => genre.code)
	genre: Genres;

	@Column()
	pages: number;

	@Column()
	publisher: string;

	@Column()
	language: string;

	@Column()
	stock_qty: number;

	@Column()
	path: string;
}



/* ,import { IBook } from "../interfaces";
import pool from "../../database/index";

export class Book {
	id?: number;
	name: string;
	description: string;
	price: number;
	author: string;
	published: number;
	form: number;
	genre: number;
	pages: number;
	publisher: string;
	language: string;
	stock_qty: number;
	path: string;

	constructor(
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
		path: string
	) {
		this.name = name;
		this.description = description;
		this.price = price;
		this.author = author;
		this.published = published;
		this.form = form;
		this.genre = genre;
		this.pages = pages;
		this.publisher = publisher;
		this.language = language;
		this.stock_qty = stock_qty;
		this.path = path;
	}

	static dataValidation = (data: Record<string, string>): boolean => {
		return data.id && data.name && data.decription && data.price && data.author && data.published && data.form && data.genre && data.pages && data.publisher && data.language && data.stock_qty, data.path ? true : false;
	};

	static fromDatabase = (data: IBook): Book => {
		const { author, description, price, form, name, genre, pages, language, publisher, published, stock_qty, path } = data;
		const book = new Book(
			name,
			description,
			price,
			author,
			published,
			form,
			genre,
			pages,
			publisher,
			language,
			stock_qty,
			path);
		book.id = data.id;
		return book;
	};

	static searchBook = async (searchWord: string): Promise<Book[]> => {
		try {
			const queryText = "SELECT * FROM books WHERE name ILIKE $1 OR author ILIKE $1";
			const values = [`%${searchWord}%`];
			const queryResult = await pool.query(queryText, values);
			const results = queryResult.rows.filter(data => Book.dataValidation(data));
			return results.map(book => Book.fromDatabase(book));

		} catch (err) {
			err => Promise.reject("Search query didn't get any results.");
		}

	};

} */