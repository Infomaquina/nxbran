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
      saida = 'secondary', s = 'disabled'
        
      let user = await executeQuery("SELECT * FROM registros WHERE data LIKE ? AND id = ? ORDER BY id DESC LIMIT 1", [hoje+'%',session.user.id]);
      if(user !== undefined && user.length > 0){         

         entrada = 'secondary'
         e = 'disabled'
         if(user[0].momento == 0){
            intervalo = 'primary'
            i = ''
         }
         if(user[0].momento == 1){
            retorno = 'primary'
            r = ''
         }
         if(user[0].momento == 2){
            saida = 'primary'
            s = ''
         }
         if(user[0].momento == 3){
            saida = 'secondary'
            s = 'disabled'
         }
      }

      const revalidar = async () =>{
         'use server'
         let momento = user[0].momento + 1; 
         await executeQuery("UPDATE registros SET momento = ? WHERE id = ?", [momento,user[0].id]);

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
      </>);


}
