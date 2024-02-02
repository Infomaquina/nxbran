'use server'
import executeQuery from '@/database/sql'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache';

export async function GET(req, res){
   try {
      const url = new URL(req.url)
      const id = url.searchParams.get("id")  
      const img = `/img/users/${url.searchParams.get("img")}.png`

      await executeQuery("UPDATE users SET image = ? WHERE id = ?",[img,id])
      revalidatePath('/user')
      return NextResponse.json('ok')

   } catch (error) {
      console.log("Falhou o update",error);
   }
}