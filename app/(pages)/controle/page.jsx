import executeQuery from '../../../database/sql'
import { getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]/route"
import { format } from 'date-fns';
import { Button } from "react-bootstrap";
import { revalidatePath } from 'next/cache';

export default async function Controle() {

   const hoje = format(new Date(), 'yyyy-MM-dd');
   const session = await getServerSession(authOptions)
   
   let entrada = 'primary', e = '',
      intervalo = 'secondary', i = 'disabled',
      retorno = 'secondary', r = 'disabled',
      saida = 'secondary', s = 'disabled',
      mmt = -1
        
         console.log('aqui');
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
         <form action={revalidar}>
         <div className="d-grid gap-3 mt-4">
            <Button type='submit' disabled={e} variant={entrada}>Entrada</Button>
            <Button type='submit' disabled={i} variant={intervalo}>Intervalo</Button>
            <Button type='submit' disabled={r} variant={retorno}>Retorno</Button>
            <Button type='submit' disabled={s} variant={saida}>Saída</Button>
         </div>
         </form>
      </>
      );


}
