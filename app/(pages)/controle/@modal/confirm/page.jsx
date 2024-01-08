'use client'
import { useRouter } from 'next/navigation'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useCookies } from 'next-client-cookies';

export default function Confirm({searchParams}){
   const router = useRouter()
   const cookies = useCookies();
   const session = JSON.parse(cookies.get('ponto'));

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
                  <Button variant="primary">Sim, confirmo</Button>
               </Modal.Footer>
            </Modal.Dialog>
         </div>
      </div>
   )
}