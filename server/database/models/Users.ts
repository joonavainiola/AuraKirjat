
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
// import { Discounts } from "./Discounts";

@Entity()
export class Users {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	full_name: string;

	@Column({
		unique: true
	})
	email: string;

	@Column()
	password: string;

	@Column()
	is_admin: boolean;

	@Column({ nullable: true })
	address: string;

	@Column({ nullable: true })
	discount_code: string;
	// @ManyToOne(() => Discounts, discount => discount.code)
	// discount_code: Discounts;

	@Column({ nullable: true })
	phone: string;

	@Column({ nullable: true })
	postal_code: string;
}