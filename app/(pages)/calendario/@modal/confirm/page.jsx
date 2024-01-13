'use client'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ServerCalendario from "@/app/components/ServerCalendario"
import { useRouter } from 'next/navigation'
import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';


export default function Confirm({searchParams}){
   const router = useRouter()
   const [ state, formAction ] = useFormState(ServerCalendario)
   const { pending } = useFormStatus()
   const [users, setUsers] = useState([])
   const [folgas, setFolgas] = useState([]);
   const [checkboxStates, setCheckboxStates] = useState({});

   useEffect(() => {

      const fetchData = async () =>{
         try {
            const response = await fetch(`/api/ListaUsuarios?dia=${searchParams.data}`,{method: 'GET'})
            const data = await response.json();

            setUsers(data.users);
            setFolgas(data.folgas);

            const initialCheckboxStates = {};
            data.users.forEach((user) => {
               if(data.folgas.some((folga) => folga.id_user === user.id)){
                  initialCheckboxStates[user.id] = true;               
               }
            });
            setCheckboxStates(initialCheckboxStates);

         } catch (error) {
            console.log("ERRO ao pegar users",error);
         }
      }
      fetchData()
   },[searchParams.data])
   
   const handleCheckboxChange = (userId, isChecked) => {
      setCheckboxStates((prevStates) => ({
         ...prevStates,
         [userId]: isChecked,
      }));
   };

   function formatarData(dia){
      const result =  format(parseISO(dia), "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR });
      return result.replace(/\b\w/g, (match) => match.toLocaleUpperCase());
   }

   return (
      <div className="modal-overlay">
         <div className="modal show animate__animated animate__fadeIn" style={{ display: 'block', position: 'absolute', top: '20%'}}
         >
            <Modal.Dialog>
               <Modal.Header>
                  <Modal.Title>{formatarData(searchParams.data)}</Modal.Title>
               </Modal.Header>

               <form action={formAction}>
               <Modal.Body>               
                  <div className="d-grid gap-2">
                     {users.map((users)=>(
                        <ToggleButton
                           key={users.id}
                           className="mb-2"
                           id={'i'+users.id}
                           type="checkbox"
                           variant="outline-primary"
                           checked={checkboxStates[users.id] || false}
                           value={users.id}
                           onChange={(e) => handleCheckboxChange(users.id, e.currentTarget.checked)}
                           >
                           {users.name}
                        </ToggleButton>
                     ))}
                  </div>
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