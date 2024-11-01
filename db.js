import { createClient } from '@libsql/client'
import dotenv from 'dotenv';

dotenv.config();
const db = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_TOKEN
});

export const checkConnection = async () => {
  try {
    const result = await db.execute('SELECT 1');
    console.log('Conexión exitosa:', result.rows);
  } catch (error) {
    console.error('Error de conexión:', error);
  }
};

export default db;
