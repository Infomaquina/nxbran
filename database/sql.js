import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
} = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  connectionLimit: 10,
});

const executeQuery = async(query, data)=>{
   let connection
   try {
      connection = await pool.getConnection();      
      const [result] = await connection.query(query,data);
      connection.release();

      return result
   } catch (error) {
      console.log(error);
      return error      
   } finally{
      if(connection){
         connection.release()
      }
   }
}

export default executeQuery;

