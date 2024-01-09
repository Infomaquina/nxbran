'use client'
import { useRouter } from 'next/navigation'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useCookies } from 'next-client-cookies';
import ServerAction from '@/app/components/ServerAction';
import { useFormState, useFormStatus } from 'react-dom';
const initialState = {
   message : false
}

export default function Confirm({searchParams}){
   const router = useRouter()
   const cookies = useCookies();
   const session = JSON.parse(cookies.get('ponto'));
   const [ state, formAction ] = useFormState(ServerAction, initialState)
   const { pending } = useFormStatus()
     
   if(state?.message){
      router.back()
   }

   return (
      <div className="modal-overlay">
         <div className="modal show animate__animated animate__fadeIn" style={{ display: 'block', position: 'absolute', top: '20%'}}
         >
            <Modal.Dialog>
               <Modal.Header>
                  <Modal.Title>{session['name']}</Modal.Title>
               </Modal.Header>

               <Modal.Body>
                  <p>Confirma a <strong>{searchParams.escolha}</strong>?</p>
               </Modal.Body>

               <Modal.Footer>   
                  <Button onClick={() => router.back()} variant="secondary">Não, voltar</Button>
                  <form method='post' action={formAction}>
                     <input type="hidden" name="momento" id="momento" value={searchParams.momento} />
                     <Button type='submit' variant="primary">{pending? "Registrando..." : "Sim, confirmo"}</Button>   
                  </form>
               </Modal.Footer>
            </Modal.Dialog>
         </div>
      </div>
   )
}