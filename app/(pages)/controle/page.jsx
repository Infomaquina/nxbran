import executeQuery from '@/database/sql'
import UserSession from '@/app/components/UserSession';  
import Link from 'next/link';
import { addHours, format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons'
import { faCirclePause } from '@fortawesome/free-solid-svg-icons'
import { faCircleStop } from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-solid-svg-icons'

export default async function Controle() {

   const hoje = format(new Date(), 'yyyy-MM-dd');
   const session = await UserSession()

   function formatarHora(hora,add){
      let nh = new Date(hora)
      let ah = addHours(nh, add)
      console.log(ah);
      return format(ah, 'HH:mm:ss')
   }
   
   let entrada = 'btn btn-success btn-lg shadow', e = '',
      intervalo = 'btn btn-secondary btn-lg shadow', i = 'disabled',
      retorno = 'btn btn-secondary btn-lg shadow', r = 'disabled',
      saida = 'btn btn-secondary btn-lg shadow', s = 'disabled',
      mmt = -1
        
      let user = await executeQuery("SELECT * FROM registros WHERE data LIKE ? AND id_user = ? ORDER BY id DESC", [hoje+'%',session.user.id]);
      
      let entradaPrev = '2000-01-01 '+session.user.entrada
      let intervaloPrev = formatarHora(entradaPrev,4)
      let retornoPrev = formatarHora(entradaPrev,5)
      let saidaPrev = formatarHora(entradaPrev,8)
      
      if(user !== undefined && user.length > 0){  
      
         intervaloPrev = formatarHora(user[0].data,4)
         retornoPrev = formatarHora(user[0].data,5)
         saidaPrev = formatarHora(user[0].data,8)

         mmt = user[0].momento;
         entrada = 'btn btn-secondary btn-lg shadow', e = 'disabled'
         if(mmt == 0){
            intervalo = 'btn btn-success btn-lg shadow'
            i = ''
         }
         if(mmt == 1){
            retorno = 'btn btn-success btn-lg shadow'
            r = ''
         }
         if(mmt == 2){
            saida = 'btn btn-success btn-lg shadow'
            s = ''
         }
         if(mmt == 3){
            entrada = 'btn btn-secondary btn-lg shadow'
            s = 'disabled'
         }
      }

      return (<>
         <div className="d-grid gap-0 mt-3">

            <h5 className={user[0]? 'mt-3 text-success' : 'mt-3 text-secondary'}>
               <FontAwesomeIcon icon={user[0]? faCircleCheck : faClock} className='me-2'/>{user[0]? user[0].data.split(' ')[1] : session.user.entrada}
            </h5>
            <Link href={user[0]? '' : "/controle/confirm?escolha=entrada&momento=0"} className={entrada}>
               <FontAwesomeIcon icon={faCirclePlay} className='me-2' />Entrada
            </Link>

            <h5 className={user[1]? 'mt-3 text-success' : 'mt-3 text-secondary'}>
               <FontAwesomeIcon icon={user[1]? faCircleCheck : faClock} className='me-2'/>{user[1]? user[1].data.split(' ')[1] : intervaloPrev}
            </h5>
            <Link href={user[1]? '' : "/controle/confirm?escolha=intervalo&momento=1"} className={intervalo} disabled={i}>
               <FontAwesomeIcon icon={faCirclePause} className='me-2' />Intervalo
            </Link>

            <h5 className={user[2]? 'mt-3 text-success' : 'mt-3 text-secondary'}>
               <FontAwesomeIcon icon={user[2]? faCircleCheck : faClock} className='me-2'/>{user[2]? user[2].data.split(' ')[1] : retornoPrev}
            </h5>
            <Link href={user[2]? '' : "/controle/confirm?escolha=retorno&momento=2"} className={retorno} disabled={r}>
               <FontAwesomeIcon icon={faCirclePlay} className='me-2' />Retorno
            </Link>

            <h5 className={user[3]? 'mt-3 text-success' : 'mt-3 text-secondary'}>
               <FontAwesomeIcon icon={user[3]? faCircleCheck : faClock} className='me-2'/>{user[3]? user[3].data.split(' ')[1] : saidaPrev}
            </h5>
            <Link href={user[3]? '' : "/controle/confirm?escolha=saída&momento=3"} className={saida} disabled={s}>
               <FontAwesomeIcon icon={faCircleStop} className='me-2' />Saída
            </Link>
         </div>
      </>
      );


}
