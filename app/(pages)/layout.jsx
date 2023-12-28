import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import executeQuery from "@/database/sql";


export default async function PrivateLayout({children}){
   const session = await getServerSession(authOptions)

   if(!session || !validateToken(session.token, session.id)){
      redirect('/')
   }

   return <>{children}</>
}

async function validateToken(token, id) {
  try {
   console.log(token);
    // Verificar se o token é o último token de acesso válido para o usuário
    const user = await executeQuery("SELECT token FROM users WHERE id = ?", [id]);

    if(user[0].token !== token) {
      console.error("Token inválido. Usuário fez login em outro dispositivo.");
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro ao validar o token:", error);
    return false;
  }
}