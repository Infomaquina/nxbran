'use client'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRectangleList } from '@fortawesome/free-solid-svg-icons'
import { faFingerprint } from '@fortawesome/free-solid-svg-icons'
import 'animate.css';

export default function PathName() {
   
   const PathName = {
      '/dashboard': 'Dashboard',
      '/controle': 'Controle',
   }
   const icone = {
      '/dashboard': faRectangleList,
      '/controle': faFingerprint,
   }
   
   return (<>
      <h1 className='text-white animate__animated animate__lightSpeedInRight animate__faster'>
         <FontAwesomeIcon icon={icone[usePathname()] } className='me-1'/>{PathName[usePathname()]}
      </h1>
   </>)
}