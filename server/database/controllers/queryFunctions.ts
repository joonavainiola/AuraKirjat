import pool from "../index";
import { Request, Response } from "express";

// general functions for database queries

// get row from table by id
export const getById = async (
	req: Request,
	res: Response,
	table: string,
	id: string): Promise<Response> => {
	try {
		const queryText = "SELECT * FROM $1 WHERE id = $2";
		const values = [table, id];
		const queryResult = await pool.query(queryText, values);
		console.log("result", queryResult);
		return res.status(200).send(queryResult.rows);
	} catch (err) {
		return res.status(501).json({ error: "Server error" });
	}
};

// get all rows from table
export const getAll = async (
	req: Request,
	res: Response,
	table: string): Promise<Response> => {
	try {
		const queryText = "SELECT * FROM $1";
		const values = [table];
		const queryResult = await pool.query(queryText, values);
		return res.status(200).send(queryResult.rows);
	} catch (err) {
		return res.status(501).json({ error: "Server error" });
	}
};

/* 
With this function it is possible to search data with simple WHERE clause. 
Function requires three arguments: table name (string), table field name (string) 
and field value (RowType)
*/
type RowType = string | number | boolean;

export const searchQuery = async (
	req: Request,
	res: Response,
	table: string,
	row: string,
	rowValue: RowType
): Promise<Response> => {
	try {
		const queryText = "SELECT * FROM $1 WHERE $2 = $3";
		const values = [table, row, rowValue];
		const queryResult = await pool.query(queryText, values);
		return res.status(200).send(queryResult.rows);
	} catch (err) {
		return res.status(501).json({ error: "Server error" });
	}
};