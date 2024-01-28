import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFingerprint } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import Link from 'next/link'

export default async function FooterBar() {
   return (<>
      <nav className="navbar fixed-bottom bg-dark p-0">
         <div className="container-fluid">
            <Button type='button' variant='dark' className='animate__animated animate__lightSpeedInRight animate__faster'>
               <Link href={'/controle'}>
                  <FontAwesomeIcon icon={faFingerprint} className='fa-2x text-success' />
               </Link>
            </Button>
            <Button type='button' variant='dark' className='animate__animated animate__lightSpeedInLeft animate__faster'>
               <Link href={'/calendario'} prefetch={false}>
                  <FontAwesomeIcon icon={faCalendarDays} className='fa-2x text-success'/>
               </Link>
            </Button>
         </div>
      </nav>
   </>);
}