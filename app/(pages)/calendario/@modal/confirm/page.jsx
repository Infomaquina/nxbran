'use client'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useRouter } from 'next/navigation'
import { useFormState, useFormStatus } from 'react-dom';
import { useSession } from "next-auth/react";
import ServerCalendario from "@/app/components/ServerCalendario"


export default function Confirm({searchParams}){
   const { data: session, status } = useSession();
   const router = useRouter()
   const [ state, formAction ] = useFormState(ServerCalendario)
   const { pending } = useFormStatus()
   
   return (
      <div className="modal-overlay">
         <div className="modal show animate__animated animate__fadeIn" style={{ display: 'block', position: 'absolute', top: '20%', zIndex: 9999}}
         >
            <Modal.Dialog>
               <Modal.Header>
                  <Modal.Title>{searchParams.data}</Modal.Title>
               </Modal.Header>

               <Modal.Body>
               </Modal.Body>

               <Modal.Footer>   
                  <Button onClick={() => router.back()} variant="secondary">Cancelar</Button>
                  <form action={formAction}>
                     <Button type='submit' onClick={() => router.back()} variant="primary">{pending? "Registrando..." : "Registrar"}</Button>   
                  </form>
               </Modal.Footer>
            </Modal.Dialog>
         </div>
      </div>
   )
}