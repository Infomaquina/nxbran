'use server'
import executeQuery from '@/database/sql'
import { NextResponse } from 'next/server'

export async function PUT(req, res){
   try {
      const url = new URL(req.url)
      const id = url.searchParams.get("id")
      const geo = url.searchParams.get("geo")

      await executeQuery("UPDATE users SET location = ? WHERE id = ?",[geo,id])
      return NextResponse.json('')

   } catch (error) {
      console.log("Falhou localização",error);
      return NextResponse.json('Fail')
   }
}