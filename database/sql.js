import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = async function MySQL() {
   const connection = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD
   });

   return connection.promise();
}

export default async function conn(query, data) {
   const sql = await pool();

   try {
      const [result] = await sql.query(query, data);
      return result;
   } catch (error) {
      console.error(error);
      throw error;
   } finally {
      // Garanta que a conexão seja sempre liberada, mesmo em caso de erro
      if (sql) {
         await sql.end();
      }
   }
}
