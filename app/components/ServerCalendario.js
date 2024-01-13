'use server'
import executeQuery from '@/database/sql'
import { revalidatePath } from 'next/cache';

const ServerAction = async (prevState, formData) => {
   let folgas =  formData.getAll('folgas');
   let data = formData.get('data')

   console.log(folgas);
   try {
      await executeQuery("DELETE FROM folgas WHERE data = ?",[data])      
   } catch (error) {
      
   }
   
   for (const element of folgas){
      await executeQuery("INSERT INTO folgas (data,id_user) VALUES (?,?)", [data,element]);      
   }

   revalidatePath('/calendario');

}

export default ServerAction
