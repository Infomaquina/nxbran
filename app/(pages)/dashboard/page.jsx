import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import ButtonLogout from "../../components/ButtonLogout";
import Image from "next/image";

export default async function Dashboard() {
   const session = await getServerSession(authOptions);
   console.log(session);
   return (
      <>
         <h1>Dashboard. Olá {session.user.name}</h1>
         <Image height={100} width={100} alt="Eu" src={session.user.image}/>
         <ButtonLogout />
      </>
   );
}
