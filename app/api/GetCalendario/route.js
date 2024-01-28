'use server'
import executeQuery from '@/database/sql'
import { NextResponse } from "next/server"


export async function GET(req) {
   if(req.method === 'GET'){
      try {       

         let Qfolgas = await executeQuery("SELECT u.name, f.data, u.cor FROM folgas f LEFT JOIN users u ON f.id_user = u.id").catch(error => {
            console.error("Erro ao obter dados das folgas:", error);
            Qfolgas = [];
         })

         let users = await executeQuery("SELECT id,name,cor FROM users ORDER BY name").catch(error => {
            console.error("Erro ao obter dados de usuários:", error);
            users = [];
         })

         const folgas = Qfolgas.map(item => ({
            title: item.name,
            date: item.data,
            color: item.cor
         }));
         

         return NextResponse.json({folgas,users})
      
         
      } catch (error) {
         return NextResponse.json({error: "Não foi possivel obter os dados"})
      }   
   }
}
