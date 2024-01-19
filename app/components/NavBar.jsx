import UserImage from "./UserImage";
import PathName from "./PathName";

export default function NavBar() {
   return (<>
      <nav className="navbar sticky-top bg-dark">
         <div className="container-fluid">
            <PathName/>
            <UserImage/>
         </div>
      </nav>
   </>);
}