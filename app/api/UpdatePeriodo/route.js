import executeQuery from '@/database/sql'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache';

export async function POST(req, res){
   const data = await req.json()

   await executeQuery("DELETE FROM periodo WHERE data = ?",[data.data])
   for(const [key, param] of Object.entries(data)){

      if(key != 'data'){
         await executeQuery("INSERT INTO periodo (data, id_user, periodo) VALUES (?,?,?)",[data.data,key,param])
      }   
   }

   revalidatePath('/calendario')

   return NextResponse.json('ok')
}