import { redirect } from "next/navigation"
import AuthToken from "../components/AuthToken"
import NavBar from "../components/NavBar"
import FooterBar from "../components/FooterBar"

export default async function Header({ children}) {

   const auth = await AuthToken()
   if(auth){
      return (<>
         <NavBar/>
         <div className="container-fluid mt-2" style={{maxWidth:800}}>
            <div className="row">
               <div className="col">
                  {children}
               </div>
            </div>
         </div>
         <FooterBar/>
      </>)
   }
   redirect('/')
}