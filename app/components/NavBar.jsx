'use client'
import { usePathname } from 'next/navigation'
import SignOut from "./SignOut";
import PathName from "./PathName";

export default function NavBar({children}) {    
   return (<>
      <nav className="navbar sticky-top bg-dark">
         <div className="container-fluid">  
            <PathName/>    
            {usePathname() === '/user' ? (
               <SignOut/>
            ) : (
               children         
            )}
         </div>
      </nav>
   </>);
}