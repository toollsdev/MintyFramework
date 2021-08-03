import mysql from "mysql2";
import {QueryArgs, QueryString} from "../typings";
const cfg = require('../../../Config.json')


/**
 * SQL pool connection
 */
const pool: mysql.Pool = mysql.createPool({
    host: cfg.database.host,
    user: cfg.database.user,
    database: cfg.database.database,
    password: cfg.database.password
});

/**
 * SQL wrapper
 */
export class SQL {
    static async query<T>(query: QueryString, args: QueryArgs): Promise<T[]> {
        return new Promise<T[]>((resolve, reject) => {
            pool.query(query, args, (err: mysql.QueryError | null, result: mysql.RowDataPacket[]) => {
                if (err) { throw err; reject([])}
                resolve(result as T[])
            })
        })
    }
}