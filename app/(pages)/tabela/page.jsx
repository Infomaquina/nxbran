import executeQuery from '@/database/sql'

export default async function Tabela(){

   const data = await executeQuery(
      "SELECT DATE_FORMAT(r.data, '%d/%m/%y') AS dia, DATE_FORMAT(r.data, '%H:%i:%s') AS hora, CASE r.momento WHEN 0 THEN 'entrada' WHEN 1 THEN 'intervalo' WHEN 2 THEN 'retorno' WHEN 3 THEN 'saida' END AS result, u.name, u.cor FROM registros r LEFT JOIN users u ON r.id_user = u.id ORDER BY r.id DESC"
   )

   return (
      <div class="table-responsive">
         <table className='custom-table'>
            <thead>
               <tr>
                  <th>Dia</th>
                  <th>Hora</th>
                  <th>User</th>
                  <th>Momento</th>
               </tr>
            </thead>
            <tbody>
               {data.map(item => (
                  <tr key={item.id} style={{backgroundColor:item.cor}}>
                     <td>{item.dia}</td>
                     <td>{item.hora}</td>
                     <td>{item.name}</td>
                     <td>{item.result}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};