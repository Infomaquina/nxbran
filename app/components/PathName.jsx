'use client'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRectangleList } from '@fortawesome/free-solid-svg-icons'
import { faFingerprint } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import 'animate.css';

export default function PathName() {
   
   const PathName = {
      '/controle': 'Controle',
      '/calendario': 'Calendario',
   }
   const icone = {
      '/controle': faFingerprint,
      '/calendario': faCalendarDays,
   }
   
   return (<>
      <h1 className='text-white animate__animated animate__lightSpeedInRight animate__faster'>
         <FontAwesomeIcon icon={icone[usePathname()] } className='me-1'/>{PathName[usePathname()]}
      </h1>
   </>)
}