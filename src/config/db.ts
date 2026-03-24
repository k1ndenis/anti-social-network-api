import { Pool } from "pg";
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'anti_social_db',
});

export const testConnection = async () => {
    try {
        const result = await pool.query('SELECT NOW()');
        console.log("Database connected successfully", result.rows[0]);
    } catch (err) {
        console.error("Database connection failed:", err);
    }
};

export default pool;