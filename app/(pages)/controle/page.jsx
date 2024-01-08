import executeQuery from '@/database/sql'
import { getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]/route"
import { format } from 'date-fns';
import { revalidatePath } from 'next/cache';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons'
import { faCirclePause } from '@fortawesome/free-solid-svg-icons'
import { faCircleStop } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';

export default async function Controle() {

   const hoje = format(new Date(), 'yyyy-MM-dd');
   const session = await getServerSession(authOptions)
   
   let entrada = 'btn btn-primary btn-lg shadow', e = '',
      intervalo = 'btn btn-secondary btn-lg shadow', i = 'disabled',
      retorno = 'btn btn-secondary btn-lg shadow', r = 'disabled',
      saida = 'btn btn-secondary btn-lg shadow', s = 'disabled',
      mmt = -1
        
      let user = await executeQuery("SELECT * FROM registros WHERE data LIKE ? AND id_user = ? ORDER BY id DESC LIMIT 1", [hoje+'%',session.user.id]);
      if(user !== undefined && user.length > 0){         
         mmt = user[0].momento;
         entrada = 'secondary', e = 'disabled'
         if(mmt == 0){
            intervalo = 'primary'
            i = ''
         }
         if(mmt == 1){
            retorno = 'primary'
            r = ''
         }
         if(mmt == 2){
            saida = 'primary'
            s = ''
         }
         if(mmt == 3){
            entrada = 'secondary'
            s = 'disabled'
         }
      }

      const revalidar = async () =>{
         'use server'
         let momento = mmt + 1;
         let data = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
         await executeQuery("INSERT INTO registros (data,id_user,momento) VALUES (?,?,?)", [data,session.user.id,momento]);

         revalidatePath('/controle');
      }

      return (<>
         {/* <form action={revalidar}> */}
            <div className="d-grid gap-4 mt-5">
               <Link href="/controle/confirm?escolha=entrada" className={entrada}>
                  <FontAwesomeIcon icon={faCirclePlay} className='me-2' />Entrada
               </Link>
               <Link href="/controle/confirm?escolha=intervalo" className={intervalo} disabled={i}>
                  <FontAwesomeIcon icon={faCirclePause} className='me-2' />Intervalo
               </Link>
               <Link href="/controle/confirm?escolha=retorno" className={retorno} disabled={r}>
                  <FontAwesomeIcon icon={faCirclePlay} className='me-2' />Retorno
               </Link>
               <Link href="/controle/confirm?escolha=saída" className={saida} disabled={s}>
                  <FontAwesomeIcon icon={faCircleStop} className='me-2' />Saída
               </Link>
            </div>
         {/* </form> */}
      </>
      );


}
