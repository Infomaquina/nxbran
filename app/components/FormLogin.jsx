"use client"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function FormLogin() {

   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [erro, setErro] = useState(null)
   const route = useRouter()

   async function handleSubmit(e){
      e.preventDefault()
         const result = await signIn('credentials',{
            email,
            password,
            redirect: false
         })

         if(result?.error){
            setErro("Login ou senha inválido(s)")
            return
         }

         route.replace('/dashboard')
   }


  return (
    <form onSubmit={handleSubmit}>

      <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
      <input type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full text-gray-600" placeholder="meu@email.com" onChange={(e) => setEmail(e.target.value)}/>

      <label className="font-semibold text-sm text-gray-600 pb-1 block">Senha</label>
      <input type="password" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full text-gray-600" placeholder="Minha Senha" onChange={(e) => setPassword(e.target.value)}/>

      <button type="submit" className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
         <span className="inline-block mr-2">Login</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
      </button>
      <div className="text-center mt-2">
         {erro && <p className="text-red-500">{erro}</p>}
      </div>
    </form>
  )
}