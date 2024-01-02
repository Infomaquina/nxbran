import FormLogin from "./components/FormLogin";
import AuthToken from "./components/AuthToken" 
import ButtonGoogle from "./components/ButtonGoogle"
import ButtonTwitter from "./components/ButtonTwitter"
import { redirect } from "next/navigation"

export default async function Home() {

   const auth = await AuthToken()
   if(auth){
      redirect('/dashboard')
   }else{
      return (
         <div className="Auth-form-container">
            <FormLogin/>
         </div>
      )
   }
}
