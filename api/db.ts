import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
  ssl: {
    // Supabase bulut veritabanına bağlanmak için bu satır zorunludur:
    rejectUnauthorized: false,
  },
});

pool.on('connect', () => {
  console.log('✓ PostgreSQL veritabanına başarıyla bağlanıldı.');
});

pool.on('error', (err) => {
  console.error('Veritabanı bağlantı havuzu hatası:', err);
});