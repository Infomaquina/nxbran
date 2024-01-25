import UserSession from "./UserSession";
import Image from "next/image";
import Link from "next/link";

export default async function UserImage() {
   const session = await UserSession();
   function rand() {
      return Math.floor(Math.random() * 100);
   }

   return (
      <>
         <Link href={'/user'}>
            <Image className="rounded-circle border border-2 border-success animate__animated animate__lightSpeedInLeft" height={40} width={40} alt="Eu" src={`/img/users/${session.user.id}.jpg?${rand()}`}/>
         </Link>
      </>
   )
}