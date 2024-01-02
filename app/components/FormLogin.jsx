"use client"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { faCircleRight } from '@fortawesome/free-solid-svg-icons'

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
    <form className="Auth-form" onSubmit={handleSubmit}>
      
      <div className="Auth-form-content">
         <h3 className="Auth-form-title">
            <Image src="/img/pwa/p.png" alt="Logo" width={100} height={30}/>
         </h3>
         <div className="form-group mt-3">
            <label>
               <FontAwesomeIcon icon={faEnvelope} className="me-2" />E-mail
            </label>
            <input type="email" className="form-control mt-1" placeholder="Meu@email.com" onChange={(e) => setEmail(e.target.value)}/>
         </div>
         <div className="form-group mt-2">
            <label>
               <FontAwesomeIcon icon={faLock} className="me-2" />Senha
            </label>
            <input type="password" className="form-control mt-1" placeholder="Minha senha" onChange={(e) => setPassword(e.target.value)}/>
         </div>
         <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
            <FontAwesomeIcon icon={faCircleRight} className="me-2" />Entrar
            </button>
         </div>
      </div>
      <div className="text-center mt-2">
         {erro && <p className="text-danger">{erro}</p>}
      </div>
    </form>
  )
}