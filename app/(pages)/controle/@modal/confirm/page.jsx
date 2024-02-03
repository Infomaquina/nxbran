'use client'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ServerAction from '@/app/components/ServerAction';
import LoadingButton from '@/app/components/LoadingButton';
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react";
import { useFormState } from 'react-dom';

const initialState = {
   message : false
}

export default function Confirm({searchParams}){
   const { data: session, status } = useSession();
   const router = useRouter()
   const [ state, formAction ] = useFormState(ServerAction, initialState)
   
   return (
      <div className="modal-overlay">
         <div className="modal show animate__animated animate__fadeIn" style={{ display: 'block', position: 'absolute', top: '20%'}}
         >
            <Modal.Dialog>
               <Modal.Header>
                  <Modal.Title>{session.user.name}</Modal.Title>
               </Modal.Header>

               <Modal.Body>
                  <p>Confirma a <strong>{searchParams.escolha}</strong>?</p>
               </Modal.Body>

               <Modal.Footer>   
                  <Button onClick={() => router.back()} variant="secondary">Não, voltar</Button>
                  <form action={formAction}>
                     <input type="hidden" name="momento" id="momento" value={searchParams.momento} />
                     <input type="hidden" name="idUser" id="idUser" value={session.user.id} />
                     <LoadingButton/>   
                  </form>
               </Modal.Footer>
            </Modal.Dialog>
         </div>
      </div>
   )
}