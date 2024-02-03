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
   let mmt = -1
      
   let user = await executeQuery("SELECT * FROM registros WHERE data LIKE ? AND id_user = ? ORDER BY id DESC", [hoje+'%',session.user.id]);
   
   let entradaPrev = '2000-01-01 '+session.user.entrada
   let intervaloPrev = formatarHora(entradaPrev,4)
   let retornoPrev = formatarHora(entradaPrev,5)
   let saidaPrev = formatarHora(entradaPrev,8)

   let btnSecondary = 'btn btn-secondary btn-lg shadow'
   let btnPrimary = 'btn btn-success btn-lg shadow'
   
   let entrada = {
      botao : btnSecondary,
      link: '',
   } 
   let intervalo = {
      botao : btnSecondary,
      link: '',
   } 
   let retorno = {
      botao : btnSecondary,
      link: '',
   } 
   let saida = {
      botao : btnSecondary,
      link: '',
   } 
      
   if(user !== undefined && user.length > 0){  
   
      intervaloPrev = formatarHora(user[0].data,4)
      retornoPrev = formatarHora(user[0].data,5)
      saidaPrev = formatarHora(user[0].data,8)

      mmt = user[0].momento;
      if(mmt == 0){
         intervalo = {
            botao : btnPrimary,
            link: '/controle/confirm?escolha=intervalo&momento=1',
         } 
      }
      if(mmt == 1){ 
         retorno = {
            botao : btnPrimary,
            link: '/controle/confirm?escolha=retorno&momento=2',
         } 
      }
      if(mmt == 2){
         saida = {
            botao : btnPrimary,
            link: '/controle/confirm?escolha=saida&momento=3',
         } 
      }
   }else{
      entrada = {
         botao : btnPrimary,
         icon: faClock,
         link: '/controle/confirm?escolha=entrada&momento=0',
      } 
   }

      return (<>
         <div className="d-grid gap-0 mt-3">

            {/* ENTRADA */}
            <h5 className={user[0]? 'mt-3 text-success' : 'mt-3 text-secondary'}>
               <FontAwesomeIcon icon={user[0]? faCircleCheck : faClock} 
               className='me-2'/>{user[0]? user[0].data.split(' ')[1] : session.user.entrada}
            </h5>
            <Link href={entrada.link} className={entrada.botao}>
               <FontAwesomeIcon icon={faCirclePlay} className='me-2' />Entrada
            </Link>

            {/* INTERVALO */}
            <h5 className={user[1]? 'mt-3 text-success' : 'mt-3 text-secondary'}>
               <FontAwesomeIcon icon={user[1]? faCircleCheck : faClock} className='me-2'/>{user[1]? user[1].data.split(' ')[1] : intervaloPrev}
            </h5>
            <Link href={intervalo.link} className={intervalo.botao}>
               <FontAwesomeIcon icon={faCirclePause} className='me-2' />Intervalo
            </Link>

            {/* RETORNO */}
            <h5 className={user[2]? 'mt-3 text-success' : 'mt-3 text-secondary'}>
               <FontAwesomeIcon icon={user[2]? faCircleCheck : faClock} className='me-2'/>{user[2]? user[2].data.split(' ')[1] : retornoPrev}
            </h5>
            <Link href={retorno.link} className={retorno.botao}>
               <FontAwesomeIcon icon={faCirclePlay} className='me-2' />Retorno
            </Link>

            {/* SAÍDA */}
            <h5 className={user[3]? 'mt-3 text-success' : 'mt-3 text-secondary'}>
               <FontAwesomeIcon icon={user[3]? faCircleCheck : faClock} className='me-2'/>{user[3]? user[3].data.split(' ')[1] : saidaPrev}
            </h5>
            <Link href={saida.link} className={saida.botao}>
               <FontAwesomeIcon icon={faCircleStop} className='me-2' />Saída
            </Link>
         </div>
      </>
      );


}
