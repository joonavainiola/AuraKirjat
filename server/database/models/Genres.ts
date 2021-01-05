import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Genres {

    @PrimaryColumn()
    code: number;

    @Column()
    finnish_name: string;

    @Column()
    english_name: string;

}