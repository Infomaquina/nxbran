'use client'
import Modal from 'react-bootstrap/Modal';
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { useRouter } from 'next/navigation';


export default function Confirm({searchParams}){

   const router = useRouter();

   async function updateAvatar(img){
      try {
         await fetch(`/api/UpdateAvatar?img=${img}&id=${searchParams.id}`,{
            method: 'PUT'
         })
         router.back()
      } catch (error) {
         console.log('Impossivel salvar imagem',error);
      }   
   }
   
   return (
      <div className="modal-overlay">
         <div className="modal show animate__animated animate__fadeIn" style={{ display: 'block', position: 'absolute'}}
         >
            <Modal.Dialog style={{marginBottom:'60px',marginTop:'60px'}}>
               <Modal.Header>
                  <Modal.Title>Escolha um avatar</Modal.Title>
                  <FontAwesomeIcon icon={faCircleXmark} className="fa-2x" onClick={()=>router.back()} />
               </Modal.Header>

               <Modal.Body className="text-center">
                  {Array.from({length:48}, (_,i)=>(
                     <Image
                     key={i}
                     src={`/img/users/${i}.png`}
                     className="rounded-start d-inline m-2"
                     alt="User Image"
                     height={60}
                     width={60}
                     style={{ cursor: "pointer" }}
                     onClick={()=>updateAvatar(i)}/>                  
                  ))}                  
               </Modal.Body>

               <Modal.Footer>
               </Modal.Footer>
            </Modal.Dialog>
         </div>
      </div>
   )
}