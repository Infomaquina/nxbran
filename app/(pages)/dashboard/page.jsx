import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import ButtonLogout from "@/app/components/ButtonLogout"

export default async function dashboard() {
  const session = await getServerSession(authOptions)
  return (
   <>
      <h1>Dashboard. Olá {session.name}</h1>
      <ButtonLogout/>
   </>
  )
}