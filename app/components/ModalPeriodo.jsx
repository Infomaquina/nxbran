'use client'
import Modal from 'react-bootstrap/Modal';
import ptBR from 'date-fns/locale/pt-BR';
import Image from "next/image";
import { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { faReply } from '@fortawesome/free-solid-svg-icons'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import { faMoon } from '@fortawesome/free-solid-svg-icons'

export default function Confirm({date,close,closeUpdate}){

   const [checkboxStates, setCheckboxStates] = useState({});
   const [users, setUsers] = useState([])

   useEffect(()=>{      
      const fetchData = async ()=>{
         try {
            const response = await fetch("/api/GetUsers?date="+date,{
               method: 'PUT'
            })
            const dados = await response.json()
            setUsers(dados.users)
            console.log(dados.users);
         } catch (error) {
            console.log("Erro ao coletar clientes", error);
         }
      }
      fetchData()
   }, [date])

   const handleCheckboxChange = (userId, isChecked) => {
      setCheckboxStates((prevStates) => ({
         ...prevStates,
         [userId]: isChecked,
      }));
   };

   function formatarData(dia){
      const result =  format(parseISO(dia), "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR });
      return result.charAt(0).toUpperCase() + result.slice(1);
   }

   const formAction = async (e)=>{
      e.preventDefault()

      const formData = new FormData(e.target);
      const formValues = {};
      for (const [name, value] of formData.entries()) {
         formValues[name] = value;
      }

      try {
         const response = await fetch(`/api/UpdatePeriodo`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(formValues),
         });
         if (!response.ok) {
            throw new Error('Failed to submit form data');
         }
         // Handle successful response
      } catch (error) {
         console.error('Error submitting form data:', error);
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
      closeUpdate(selectedNames)
   }

   return (
      <div className="modal-overlay">
         <div className="modal show animate__animated animate__fadeIn" style={{ display: 'block', position: 'absolute', paddingTop: '70px', paddingBottom: '70px'}}
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
                        <div className='d-flex justify-content-between' key={users.id}>
                           <div>
                              <Image className="rounded-circle bg-white me-2" height={40} width={40} alt="Eu" src={users.image}/>
                              <strong>{users.name}</strong> 
                           </div>

                           <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                              <input 
                                 type="radio" 
                                 class="btn-check" 
                                 name={users.id} 
                                 id={`m${users.id}`} 
                                 value='0'
                                 autocomplete="off" 
                                 onChange={(e) => handleCheckboxChange(`m${users.id}`, e.currentTarget.checked)}/>
                              <label class="btn btn-outline-success" for={`m${users.id}`}>
                                 <FontAwesomeIcon icon={faSun} className='me-1'/>Dia
                              </label>

                              <input 
                                 type="radio" 
                                 class="btn-check" 
                                 name={users.id} 
                                 id={`t${users.id}`} 
                                 value='1'
                                 autocomplete="off"
                                 onChange={(e) => handleCheckboxChange(`t${users.id}`, e.currentTarget.checked)}/>
                              <label class="btn btn-outline-success" for={`t${users.id}`}>
                                 <FontAwesomeIcon icon={faMoon} className='me-1'/>Noite
                              </label>
                           </div>
                        </div>                          
                     ))}
                  </div>
               </Modal.Body>

               <Modal.Footer>   
                  <button onClick={close} className="btn btn-secondary shadow"><FontAwesomeIcon icon={faReply} /> Cancelar</button>
                  <button type='submit' className='btn btn-success shadow'><FontAwesomeIcon icon={faFloppyDisk} /> Registrar</button>   
               </Modal.Footer>
               </form>
            </Modal.Dialog>
         </div>
      </div>
   )
}