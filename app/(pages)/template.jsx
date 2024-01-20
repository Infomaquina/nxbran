import { redirect } from "next/navigation"
import AuthToken from "@/app//components/AuthToken"
import NavBar from "@/app//components/NavBar"
import FooterBar from "@/app//components/FooterBar"
import UserImage from "@/app/components/UserImage";

export default async function Header({ children }) {

   const auth = await AuthToken()
   if(auth){
      return (<>
         <NavBar>
            <UserImage/>
         </NavBar>
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