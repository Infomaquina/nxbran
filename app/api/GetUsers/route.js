'use server'
import executeQuery from '@/database/sql'
import { NextResponse } from "next/server"

export async function PUT(req) {
   try {
      const url = new URL(req.url)
      const date = url.searchParams.get("date")

      let users = await executeQuery(
         `SELECT u.id, u.name, u.image, u.cor, p.periodo 
            FROM users u
         LEFT JOIN periodo p
            ON u.id = p.id_user
            AND p.data = ?
         WHERE u.id NOT IN 
            (SELECT id_user FROM folgas WHERE data = ?) 
         ORDER BY u.name
         `,[date,date]).catch(error => {
         console.error("Erro ao obter dados de usuários:", error);
         users = [];
      })

      return NextResponse.json({users})
   
      
   } catch (error) {
      return NextResponse.json({error: "Não foi possivel obter os dados"})
   } 
}
