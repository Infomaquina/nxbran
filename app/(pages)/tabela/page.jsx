import executeQuery from '@/database/sql'

export default async function Tabela(){
   const hoje = new Date();
   const dia = hoje.getDate();

   const day = dia.toString().padStart(2, '0');
   const mes = (hoje.getMonth() + 1).toString().padStart(2, '0');
   const ano = hoje.getFullYear();
   const time = ano+'-'+mes+'-'+day 

   const data = await executeQuery(
      "SELECT DATE_FORMAT(r.data, '%H:%i:%s') AS hora, CASE r.momento WHEN 0 THEN 'entrada' WHEN 1 THEN 'intervalo' WHEN 2 THEN 'retorno' WHEN 3 THEN 'saida' END AS result, u.name, u.cor FROM registros r LEFT JOIN users u ON r.id_user = u.id WHERE r.data LIKE '"+time+"%' ORDER BY r.id DESC"
   )


   return (
      <div className="table-responsive">
         <h5 className='text-white'>Hoje {dia}</h5>
         <table className='custom-table'>
            {data.map(item => (
               <tr key={item.id} style={{backgroundColor:item.cor}}>
                  <td>{item.hora}</td>
                  <td>{item.name}</td>
                  <td>{item.result}</td>
               </tr>
            ))}
         </table>
      </div>
   );
};