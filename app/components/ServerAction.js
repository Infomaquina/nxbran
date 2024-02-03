'use server'
import executeQuery from '@/database/sql'
// import { format } from 'date-fns';
import { revalidatePath } from 'next/cache';

const ServerAction = async (prevState, formData) => {
   let momento =  formData.get('momento');
   let id_user =  formData.get('idUser');

   const opcoes = { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit', 
      timeZone: 'UTC' 
   };

   const dataAtual = new Date();
   const data = dataAtual.toLocaleString('en-US', opcoes).replace(/(\d+)\/(\d+)\/(\d+), (\d+:\d+:\d+)/, '$3-$1-$2 $4');

   await executeQuery("INSERT INTO registros (data,id_user,momento) VALUES (?,?,?)", [data,id_user,momento]);

   revalidatePath('/controle');

}

export default ServerAction
