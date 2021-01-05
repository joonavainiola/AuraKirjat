import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { Users } from "../models/Users";

@Entity()
export class Orders {

	@PrimaryColumn()
	id: string;

	@ManyToOne(() => Users, user => user.id)
	user: Users;

	@Column()
	delivery_address: string;

	@Column({ nullable: true })
	postal_code: string;

	@Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
	total_sum: number;

	@Column({ type: "timestamp without time zone" })
	order_time: string;

	@Column()
	delivery_method: string;

}