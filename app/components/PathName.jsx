'use client'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFingerprint } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'

export default function PathName() {
   
   const PathName = {
      '/controle': 'Controle',
      '/calendario': 'Calendario',
      '/user': 'Usuário',
   }
   const icone = {
      '/controle': faFingerprint,
      '/calendario': faCalendarDays,
      '/user': faUser,
   }
   
   return (<>
      <h1 className='text-success animate__animated animate__lightSpeedInRight animate__faster'>
         <FontAwesomeIcon icon={icone[usePathname()] } className='me-1'/>{PathName[usePathname()]}
      </h1>
   </>)
}