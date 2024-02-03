import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/navigation'
import { useFormStatus } from 'react-dom';

export default function LoadingButton() {

   const { pending } = useFormStatus()
   const router = useRouter()
   
   return (<>                     
      <Button type='submit' onClick={() => router.back()} variant="success">{pending? "Registrando..." : "Sim, confirmo"}</Button>
   </>)
}
