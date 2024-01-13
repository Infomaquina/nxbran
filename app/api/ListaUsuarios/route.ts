'use server'
import executeQuery from '@/database/sql'
import { NextResponse, NextRequest } from "next/server"

export async function GET(req:NextRequest) {
   if(req.method === 'GET'){
      try {
         const url = new URL(req.url)
         const dia = url.searchParams.get("dia")         

         let users = await executeQuery("SELECT id,name FROM users ORDER BY name").catch(error => {
            console.error("Erro ao obter dados de usuários:", error);
            users = [];
         })
      
         let folgas = await executeQuery("SELECT id_user FROM folgas WHERE data = ?",[dia]).catch(error => {
            console.error("Erro ao obter dados de folgas:", error);
            folgas = [];
         });

         return NextResponse.json({users,folgas})
      
         
      } catch (error) {
         return NextResponse.json({error: "Não foi possivel obter os dados"})
      }   
   }
}
