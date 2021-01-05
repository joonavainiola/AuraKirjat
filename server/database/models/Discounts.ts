import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Genres } from "../models/Genres";


@Entity()
export class Discounts {

	@PrimaryGeneratedColumn()
	id: number;

	/*	@Column({
			unique: true
		})
		code: string;
	*/
	@Column()
	code: string;

	/*	@Column()
		coefficient: number;
	
	@Column({ precision: 5, scale: 2 })
	coefficient: number;
*/
	@Column({ type: "decimal", precision: 2, scale: 2, nullable: true })
	coefficient: number

	@ManyToOne(() => Genres, genre => genre.code)
	genre: Genres;

}