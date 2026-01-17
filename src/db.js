//usuario: postgres
//& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -h localhost -p 5433 -U postgres 
import { DB_USER, DB_HOST, DB_PASSWORD, DB_NAME, DB_PORT } from './config.js';

import pg from "pg";

export const pool = new pg.Pool({
    user: DB_USER,
    host: DB_HOST,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT
});
