import Image from "next/image"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"
import executeQuery from "@/database/sql"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { faKey } from "@fortawesome/free-solid-svg-icons"
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons"
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons"
import { Button } from "react-bootstrap"
import UploadImage from "@/app/components/UploadImage"

export default async function user() {
   let users = await executeQuery("SELECT * FROM users")

   return (<>
   <form action="formaAction">
      {users.map((user) => (
         <div key={user.id} className="row g-2 mt-2 mb-4">  
            <input type="hidden" name={user.id} />          
            <div className="col-3">
               <UploadImage id={user.id} />
            </div>
            <div className="col-9">
               <FloatingLabel label={<><FontAwesomeIcon icon={faUser}/> Login</>}>
                  <Form.Control type="text" placeholder="x" name="nome" value={user.name} />
               </FloatingLabel>
            </div>
            <div className="col-6">
               <FloatingLabel label={<><FontAwesomeIcon icon={faKey}/> Senha</>}>
                  <Form.Control type="text" placeholder="x" name="senha" />
               </FloatingLabel>
            </div>
            <div className="col-6">
               <FloatingLabel label={<><FontAwesomeIcon icon={faDoorOpen}/> Entrada</>}>
                  <Form.Control type="time" placeholder="x" name="entrada" value={user.entrada} />
               </FloatingLabel>
            </div>
         </div>
      ))}
      <div className="row g-2 mt-2 mb-4">  
         <input type="hidden" name="0"/>          
         <div className="col-3">
            <Image src="/img/users/7.jpg" className="rounded border border-2 shadow" alt="User Image" height={60} width={60} />
         </div>
         <div className="col-9">
            <FloatingLabel label={<><FontAwesomeIcon icon={faUser}/> Novo Colaborador(a)</>}>
               <Form.Control type="text" placeholder="x" />
            </FloatingLabel>
         </div>
         <div className="col-6">
            <FloatingLabel label={<><FontAwesomeIcon icon={faKey}/> Senha</>}>
               <Form.Control type="text" placeholder="x" />
            </FloatingLabel>
         </div>
         <div className="col-6">
            <FloatingLabel label={<><FontAwesomeIcon icon={faDoorOpen}/> Entrada</>}>
               <Form.Control type="time" placeholder="x" />
            </FloatingLabel>
         </div>
      </div>
      <div className="row g-2 mt-2 mb-4">
         <div className="col-12 mb-4 text-end">
            <Button type="submit" variant="success" className="text-white">
               <FontAwesomeIcon icon={faFloppyDisk} /> Salvar
            </Button>
         </div>
      </div>
      <br />
   </form>
   </>)
}
