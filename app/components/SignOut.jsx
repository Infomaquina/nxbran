import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { signOut } from "next-auth/react"

export default function SignOut() {
   return (<>
      <FontAwesomeIcon className="rounded-circle animate__animated animate__lightSpeedInLeft fa-2x text-success" height={60} width={40} onClick={() => signOut()} icon={ faPowerOff }/>
   </>)
}