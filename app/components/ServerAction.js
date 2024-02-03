'use server'
import executeQuery from '@/database/sql'
// import { format } from 'date-fns';
import { revalidatePath } from 'next/cache';

const ServerAction = async (prevState, formData) => {
   let momento =  formData.get('momento');
   let id_user =  formData.get('idUser');

   const dataAtual = new Date();
   const ano = dataAtual.getFullYear();
   const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
   const dia = dataAtual.getDate().toString().padStart(2, '0');  
   const horas = dataAtual.getHours().toString().padStart(2, '0');
   const minutos = dataAtual.getMinutes().toString().padStart(2, '0');
   const segundos = dataAtual.getSeconds().toString().padStart(2, '0');  
   const data = `${ano}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;

   await executeQuery("INSERT INTO registros (data,id_user,momento) VALUES (?,?,?)", [data,id_user,momento]);

   revalidatePath('/controle');

}

export default ServerAction
