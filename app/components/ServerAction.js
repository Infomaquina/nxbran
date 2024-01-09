'use server'
import executeQuery from '@/database/sql'
import { format } from 'date-fns';
import { revalidatePath } from 'next/cache';

const ServerAction = async (prevState, formData) => {
   let momento =  formData.get('momento');
   let data = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
   await executeQuery("INSERT INTO registros (data,id_user,momento) VALUES (?,?,?)", [data,1,momento]);

   revalidatePath('/controle');

}

export default ServerAction
