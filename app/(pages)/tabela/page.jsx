import executeQuery from '@/database/sql'

export default async function Tabela(){
   const hoje = new Date();
   const dia = hoje.getDate();

   const day = dia.toString().padStart(2, '0');
   const mes = (hoje.getMonth() + 1).toString().padStart(2, '0');
   const ano = hoje.getFullYear();
   const time = ano+'-'+mes 

   const data = await executeQuery(
      "SELECT DATE_FORMAT(r.data, '%d %H:%i:%s') AS hora, DATE_FORMAT(r.data, '%d/%m') AS dia, CASE r.momento WHEN 0 THEN 'entrada' WHEN 1 THEN 'intervalo' WHEN 2 THEN 'retorno' WHEN 3 THEN 'saida' END AS result, u.name, u.cor FROM registros r LEFT JOIN users u ON r.id_user = u.id ORDER BY r.id DESC"
   )


   return (
      <div className="table-responsive">
         <table className='custom-table'>
            <thead>
               <tr className=' bg-white'>
                  <td>Dia</td>
                  <td>Hora</td>
                  <td>User</td>
                  <td>Ação</td>
               </tr>
            </thead>
            <tbody>
               {data.map(item => (
                  <tr key={item.id} className='text-white'>
                     <td>{item.dia}</td>
                     <td>{item.hora}</td>
                     <td><span className='rounded p-2' style={{backgroundColor:item.cor}}>{item.name}</span></td>
                     <td>{item.result}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};