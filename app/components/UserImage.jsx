import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function UserImage() {
   const session = await getServerSession(authOptions);
   return (
      <>
         <Image className="rounded-circle border border-2 border-dark" height={40} width={40} alt="Eu" src={session.user.image}/>
      </>
   )
}