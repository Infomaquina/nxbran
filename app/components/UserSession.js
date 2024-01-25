import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"

export default async function UserSession() {
   return await getServerSession(authOptions)
}
