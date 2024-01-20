import Image from "next/image"
import UserSession from "@/app/components/UserSession"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"
import { faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import executeQuery from "@/database/sql"

export default async function user() {
   const session = await UserSession()
   let users = await executeQuery("SELECT * FROM users")

  return (<>
   <div className="row">
      <div className="col-4 text-center">
         <Image src={session.user.image} className="rounded border border-2 shadow" alt="User Image" height={105} width={105} />
      </div>
      <div className="col-8">
         <FloatingLabel controlId="floatingSelect" 
            label={<><FontAwesomeIcon icon={faUsers}/> Usuários</>}>
            <Form.Select>
               {users.map((user) => (
                  <option key={user.id} value={user.id}>{user.name}</option>
               ))}
            </Form.Select>
         </FloatingLabel>
      </div>
  </div>
  </>)
}
