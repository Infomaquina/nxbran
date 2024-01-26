import executeQuery from '@/database/sql'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache';

export async function POST(req, res){
   const query = await req.json()
   
   await executeQuery("INSERT INTO folgas (data, id_user) VALUES (?,?)",[query.data,query.id_user])

   revalidatePath('/calendario')

   return NextResponse.json('ok')
}

export async function DELETE(req, res){
   try {      
      const url = new URL(req.url)
      const data = url.searchParams.get('data')
      await executeQuery("DELETE FROM folgas WHERE data =?",[data])
      revalidatePath('/calendario')
      return NextResponse.json('ok')
   } catch (error) {
      
   } 
}