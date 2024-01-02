import UserImage from "./UserImage";
import PathName from "./PathName";

export default function NavBar() {
   return (<>
      <nav class="navbar fixed-top bg-primary">
         <div class="container-fluid">
            <PathName/>
            <UserImage/>
         </div>
      </nav>
   </>);
}