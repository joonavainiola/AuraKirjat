import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Books } from "./Books";
import { Users } from "./Users";


@Entity()
export class Shopping_carts {

	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Users, user => user.id)
	user: Users;

	@ManyToOne(() => Books, book => book.id, { eager: true })
	book: Books;

	@Column()
	quantity: number;

	@Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
	std_price: number;

	@Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
	price: number;

}

// käyttäjä käyttää alennuskoodin 
// --> ostoskoritauluun kirjoitetaan alennukset sekä alennuskoodi
// --> käyttäjä hakee pari kirjaa lisää ostoskoriin
// FUNKTIO JOKA NOLLAA OSTOSKORIN ALENNUKSET, JOS ALENNUSKOODIA EI SYÖTETÄ