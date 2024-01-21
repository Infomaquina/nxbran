import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
   const data = await request.formData()
   const file: File | null = data.get('image') as unknown as File
   const name = data.get('id_user')+'.jpg'

      
   if (!file) {
      return NextResponse.json({ success: false })
   }

   const bytes = await file.arrayBuffer()
   const buffer = Buffer.from(bytes)

   const path = `public/img/users/${name}`
   await writeFile(path, buffer)
   console.log(`open ${path} to see the uploaded file`)

   return NextResponse.json({ success: true })
}