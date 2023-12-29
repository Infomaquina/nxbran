import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import ButtonLogout from "../../components/ButtonLogout";

export default async function Dashboard() {
   const session = await getServerSession(authOptions);
   return (
      <>
         <h1>Dashboard. Olá {session.nome}</h1>
         <ButtonLogout />
      </>
   );
}
