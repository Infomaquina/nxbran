import UserSession from "./UserSession";
import executeQuery from "@/database/sql";

export default async function AuthToken(){
   const session = await UserSession()

   if(!session || !validateToken(session.token, session.id)){
      return false
   }   

   return true
}

async function validateToken(token, id) {
  try {
    // Verificar se o token é o último token de acesso válido para o usuário
    const user = await executeQuery("SELECT token FROM users WHERE id = ?", [id]);

    if(user[0] && user[0].token !== token) {
      console.error("Token inválido. Usuário fez login em outro dispositivo.");
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro ao validar o token:", error);
    return false;
  }
}