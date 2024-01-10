import FormLogin from "./components/FormLogin";
import AuthToken from "./components/AuthToken"
import { redirect } from "next/navigation"

export default async function Home() {

   const auth = await AuthToken()
   if(auth){
      redirect('/controle')
   }else{
      return (
         <div className="Auth-form-container">
            <FormLogin/>
         </div>
      )
   }
}
