'use client'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ServerCalendario from "@/app/components/ServerCalendario"
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react";
import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useState } from 'react';


export default function Confirm({searchParams}){
   const { data: session, status } = useSession();
   const router = useRouter()
   const [ state, formAction ] = useFormState(ServerCalendario)
   const { pending } = useFormStatus()
   const [users, setUsers] = useState([])
   const [folgas, setFolgas] = useState([]);

   useEffect(() => {

      const fetchData = async () =>{
         try {
            const response = await fetch(`/api/ListaUsuarios?dia=${searchParams.data}`,{method: 'GET'})
            const data = await response.json();

            setUsers(data.users);
            setFolgas(data.folgas);

         } catch (error) {
            console.log("ERRO ao pegar users",error);
         }
      }
      fetchData()
   },[searchParams.data])
   
   return (
      <div className="modal-overlay">
         <div className="modal show animate__animated animate__fadeIn" style={{ display: 'block', position: 'absolute', top: '20%'}}
         >
            <Modal.Dialog>
               <Modal.Header>
                  <Modal.Title>{searchParams.data}</Modal.Title>
               </Modal.Header>

               <form action={formAction}>
               <Modal.Body>               
                  {users.map((users)=>(
                     <Button key={users.id} variant="outline-primary" size="lg">
                        {users.name}
                     </Button>
                  ))}
               </Modal.Body>

               <Modal.Footer>   
                  <Button onClick={() => router.back()} variant="secondary">Cancelar</Button>
                     <Button type='submit' onClick={() => router.back()} variant="primary">{pending? "Registrando..." : "Registrar"}</Button>   
               </Modal.Footer>
               </form>
            </Modal.Dialog>
         </div>
      </div>
   )
}