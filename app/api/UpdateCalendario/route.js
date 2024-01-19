import executeQuery from '@/database/sql'
import { NextResponse } from 'next/server'

export async function POST(req, res){
   const query = await req.json()
   
   await executeQuery("INSERT INTO folgas (data, id_user) VALUES (?,?)",[query.data,query.id_user])

   return NextResponse.json('ok')
}

// export async function DELETE(req, res){
//    try {      
//       const formData = await req.formData()
//       const date = formData.get('date')
//       return NextResponse.json({ date, id_user })
//    } catch (error) {
      
//    } 
// }