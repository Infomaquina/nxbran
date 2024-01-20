import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFingerprint } from '@fortawesome/free-solid-svg-icons'
import { signOut } from "next-auth/react"

export default function SignOut() {
   return (<>
      <FontAwesomeIcon onClick={() => signOut()} icon={ faFingerprint }/>
   </>)
}