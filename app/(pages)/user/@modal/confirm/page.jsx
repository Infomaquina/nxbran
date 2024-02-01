'use client'
import Modal from 'react-bootstrap/Modal';
import { useSession } from "next-auth/react";
import { useEffect } from 'react';
import Image from 'next/image';


export default function Confirm({searchParams}){
   const { data: session, status } = useSession();

   useEffect(()=>{
      const imgs = async ()=>{
         try {
            const resp = await fetch("api/GetImages")
         } catch (error) {
            
         }
      }
   })
   
   return (
      <div className="modal-overlay mb-5 mt-5">
         <div className="modal show animate__animated animate__fadeIn" style={{ display: 'block', position: 'absolute'}}
         >
            <Modal.Dialog>
               <Modal.Header>
                  <Modal.Title>Escolha um avatar</Modal.Title>
               </Modal.Header>

               <Modal.Body class="text-center">
                  {Array.from({length:48}, (_,i)=>(
                     <Image
                     key={i}
                     src={`/img/users/${i}.png`}
                     className="rounded-start p-0 input-group-text d-inline m-2"
                     alt="User Image"
                     height={60}
                     width={60}
                     style={{ cursor: "pointer" }}/>                  
                  ))}                  
               </Modal.Body>

               <Modal.Footer>
               </Modal.Footer>
            </Modal.Dialog>
         </div>
      </div>
   )
}