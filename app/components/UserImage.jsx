import UserSession from "./UserSession";
import Image from "next/image";
import Link from "next/link";

export default async function UserImage() {
   const session = await UserSession();

   return (<>
      <Link href={'/user'}>
         <Image className="rounded-circle border border-2 border-success animate__animated animate__lightSpeedInLeft bg-white" height={40} width={40} alt="Eu" src={session.user.image+'?'+new Date().getTime()}/>
      </Link>
   </>)
}