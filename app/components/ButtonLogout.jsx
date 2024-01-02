'use client'
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import Button from 'react-bootstrap/Button';

export default function Logout(){
   const router = useRouter()

   async function sair(){
      await signOut({
         redirect: false
      })   

      router.replace('/')
   }

   return <Button variant="warning" onClick={sair}>Sair</Button>
}