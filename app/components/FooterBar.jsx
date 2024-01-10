import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRectangleList } from '@fortawesome/free-solid-svg-icons'
import { faFingerprint } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import Link from 'next/link'
import 'animate.css';

export default function NavBar() {
   return (<>
      <nav className="navbar fixed-bottom bg-primary p-0">
         <div className="container-fluid">
            <Button type='button' variant='primary' className='animate__animated animate__lightSpeedInLeft animate__faster'>
               <Link href={'/controle'}>
                  <FontAwesomeIcon icon={faFingerprint} className='fa-2x text-white' />
               </Link>
            </Button>
            <Button type='button' variant='primary' className='animate__animated animate__lightSpeedInRight animate__faster'>
               <Link href={'/dashboard'}>
                  <FontAwesomeIcon icon={faRectangleList} className='fa-2x text-white'/>
               </Link>
            </Button>
         </div>
      </nav>
   </>);
}