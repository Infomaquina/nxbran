"use client"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"

export default function FormLogin() {
   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm()


  const onSubmit = async (data) => {  
   const result = await signIn('credentials',{
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: '/dashboard'
   })
  }

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
      <input type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full text-gray-600" placeholder="meu@email.com" {...register("email", {required: true})} />
      <label className="font-semibold text-sm text-gray-600 pb-1 block">Senha</label>
      <input type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full text-gray-600" placeholder="Minha Senha" {...register("password", {required: true})}/>
      <button type="submit" className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
         <span className="inline-block mr-2">Login</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
      </button>
    </form>
  )
}