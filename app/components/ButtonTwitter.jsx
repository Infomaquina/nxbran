'use client'
import { signIn } from "next-auth/react"

export default function Twitter(){

   return (      
      <button onClick={() => signIn('twitter')} type="button" className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block">Twitter (X)</button>
   )
}