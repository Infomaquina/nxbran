'use client'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';


export default function Confirm({date,folgas,users,close}){

   const { pending } = useFormStatus()
   const [checkboxStates, setCheckboxStates] = useState({});

   useEffect(() => {
      const initialCheckboxStates = {};
      users.forEach((user) => {
         if (folgas.some((folga) => folga.title === user.name)) {
            initialCheckboxStates[user.id] = true;
         }
      });
      setCheckboxStates(initialCheckboxStates);
   }, [users, folgas]);
   
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

   const formAction = async (e)=>{
      e.preventDefault()

      const formData = new FormData(e.target);
      let folgas = formData.getAll('folgas');
      let data = formData.get('data')
      
      try {      
         await fetch(`/api/UpdateCalendario?data=`+data,{
            method: 'DELETE'   
         })     
      } catch (error) {
         
      }
      
      for (const id_user of folgas){
         await fetch(`/api/UpdateCalendario`,{
            method: 'POST',
            body: JSON.stringify({
               data: data,
               id_user: id_user
            }),  
            headers: {
               'Content-Type': 'application/json',
            }, 
         })     
      }

      const selectedNames = [];
      for (const userId in checkboxStates) {
         if (checkboxStates.hasOwnProperty(userId) && checkboxStates[userId]) {
            const selectedUser = users.find(user => user.id === parseInt(userId, 10));
            if (selectedUser) {
               selectedNames.push({
                  title: selectedUser.name,
                  date: date,
                  color: selectedUser.cor
               });
            }
         }
      } 
      close()
   }

   return (
      <div className="modal-overlay">
         <div className="modal show animate__animated animate__fadeIn" style={{ display: 'block', position: 'absolute', top: '20%'}}
         >
            <Modal.Dialog>
               <Modal.Header>
                  <Modal.Title>{formatarData(date)}</Modal.Title>
               </Modal.Header>

               <form onSubmit={formAction}>
               <Modal.Body>               
                  <div className="d-grid gap-2">
                     <input type="hidden" name="data" value={date} />
                     {users.map((users)=>(                    
                        <ToggleButton
                           key={users.id}
                           className="mb-2"
                           id={users.id}
                           name="folgas"
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
                  <Button onClick={close} variant="secondary">Cancelar</Button>
                     <Button type='submit' variant="primary">{pending? "Registrando..." : "Registrar"}</Button>   
               </Modal.Footer>
               </form>
            </Modal.Dialog>
         </div>
      </div>
   )
}