import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRectangleList } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import Link from 'next/link'
import 'animate.css';

export default function NavBar() {
   return (<>
      <nav className="navbar fixed-bottom bg-primary p-0">
         <div className="container-fluid">
            <Button type='button' variant='primary'>
               <Link href={'/dashboard'} className='animate__animated animate__lightSpeedInRight animate__faster'>
                  <FontAwesomeIcon icon={faRectangleList} className='fa-2x text-white'/>
               </Link>
            </Button>
         </div>
      </nav>
   </>);
}