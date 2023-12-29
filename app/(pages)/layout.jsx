import { redirect } from "next/navigation"
import AuthToken from "../components/AuthToken"

export default async function Header({ children}) {

   const auth = await AuthToken()
   if(auth){
      return (<>{children}</>)
   }
   redirect('/')
}