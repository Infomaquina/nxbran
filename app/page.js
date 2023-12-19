import executeQuery from './database/sql'
import styles from './page.module.css'

export default async function Home() {
   let result = await executeQuery("SELECT * FROM etapas",[])
   return (
      <main className={styles.main}>
         <h1>GruposNX</h1>
         <ul>
            {result.map((e)=>{
            return (
               <li key={e.id}>
                  {e.etapa}
               </li>
            )
            })}
         </ul>
      </main>
   )
}
