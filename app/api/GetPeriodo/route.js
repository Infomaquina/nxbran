'use server'
import executeQuery from '@/database/sql'
import { NextResponse } from "next/server"

export async function PUT(req) {
   try {
      let query = await executeQuery("SELECT GROUP_CONCAT(u.name ORDER BY u.name SEPARATOR ' ') AS title, p.data AS date, CASE WHEN p.periodo = 0 THEN '#f92' WHEN p.periodo = 1 THEN '#a78' WHEN p.periodo = 2 THEN '#55f' END AS color FROM periodo p LEFT JOIN users u ON p.id_user = u.id GROUP BY p.periodo, p.data").catch(error => {
         console.error("Erro ao obter dados das folgas:", error);
         query = [];
      });   

      return NextResponse.json({query})
   
      
   } catch (error) {
      return NextResponse.json({error: "Não foi possivel obter os dados"})
   } 
}
