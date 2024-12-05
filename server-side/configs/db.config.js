"use strict";
//Set Database Connections
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
require("dotenv").config();
const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } = process.env;
const pool = new pg_1.Pool({
    user: DB_USER,
    host: DB_HOST,
    password: DB_PASSWORD,
    port: Number(DB_PORT),
    database: DB_DATABASE,
});
pool.connect()
    .then(() => {
    console.log("Database connection established..");
}).catch(error => {
    throw new Error(error);
});
exports.default = pool;
