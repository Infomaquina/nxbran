'use client'
import { signIn, useSession } from "next-auth/react"

export default function Logout(){

   return (      
      <button onClick={() => signIn('google')} type="button" className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block">Google</button>
   )
}