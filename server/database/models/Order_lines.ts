import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Books } from "./Books";
import { Orders } from "./Orders";

@Entity()
export class Order_lines {

	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Orders, order => order.id, { eager: true })
	order: Orders;

	@ManyToOne(() => Books, book => book.id, { eager: true })
	book: Books;

	@Column()
	quantity: number;

	@Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
	std_price: number;

	@Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
	price: number;

	@Column({ nullable: true })
	discount_code: string;
}