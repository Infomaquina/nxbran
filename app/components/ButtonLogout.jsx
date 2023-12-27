'use client'
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Logout(){
   const router = useRouter()

   async function sair(){
      await signOut({
         redirect: false
      })   

      router.replace('/')
   }

   return <button onClick={sair} className="p-2 w-40 border border-gray-300 rounded-md">Sair</button>
}