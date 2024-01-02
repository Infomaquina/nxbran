import { redirect } from "next/navigation"
import AuthToken from "../components/AuthToken"
import NavBar from "../components/NavBar"

export default async function Header({ children}) {

   const auth = await AuthToken()
   if(auth){
      return (<><NavBar/>{children}</>)
   }
   redirect('/')
}