import executeQuery from "@/database/sql"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { faKey } from "@fortawesome/free-solid-svg-icons"
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons"
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons"
import { faPaintbrush } from "@fortawesome/free-solid-svg-icons"
import { Button } from "react-bootstrap"
import UploadImage from "@/app/components/UploadImage"
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';

export default async function user() {
   let users = await executeQuery("SELECT * FROM users")

   async function formAction(formData) {
      'use server'

      // NOVO USUARIO
      const novo_nome = formData.get("novo_nome")
      const nova_senha = formData.get("nova_senha")
      const nova_entrada = formData.get("nova_entrada")
      const nova_cor = formData.get("nova_cor")
      if(novo_nome.length > 0 && nova_senha.length > 0 && nova_entrada.length > 0) {
         let salt = await bcrypt.genSalt(10) 
         let cript = await bcrypt.hash(nova_senha, salt)
         await executeQuery("INSERT INTO users (name, password, entrada, cor, status) VALUES (?,?,?,?,?)", [novo_nome, cript, nova_entrada, nova_cor, 1])
      }

      // EDITAR USUARIOS
      const id_us = formData.getAll("id_user")
      const nomes = formData.getAll("nome")
      const entra = formData.getAll("entrada")
      const senha = formData.getAll("senha")  
      const cores = formData.getAll("cor")

      let i=0;
      for (const id of id_us) {
         if(senha[i].length > 0) {
            let salt = await bcrypt.genSalt(10)
            let cript = await bcrypt.hash(senha[i], salt)        
            await executeQuery("UPDATE users SET name =?, password =?, entrada =?, cor = ? WHERE id =?", [nomes[i], cript, entra[i], cores[i], id])
         }else{            
            await executeQuery("UPDATE users SET name =?, entrada =?, cor=? WHERE id =?", [nomes[i], entra[i], cores[i], id])
         }
         i++      
      }

      revalidatePath('/user');
   }

   return (<>
   <form action={formAction}>
      {users.map((user) => (
         <div key={user.id} className="card shadow my-3 bg-light">
               <div className="card-body">
                  <div className="row g-2">  
                     <input type="hidden" name="id_user" value={user.id} />
                     <div className="col-12">            
                        <div className="input-group">
                           <UploadImage id={user.id} />
                           <div className="form-floating">
                              <input type="text" className="form-control" style={{height:60}} required placeholder="Username" name="nome" defaultValue={user.name}/>
                              <label><FontAwesomeIcon icon={faUser}/> Login</label>
                           </div>
                        </div>
                     </div>
                     <div className="col-5">
                        <div className="form-floating">
                           <input type="text" className="form-control" placeholder="x" name="senha" defaultValue={user.senha}/>
                           <label><FontAwesomeIcon icon={faKey}/> Senha</label>
                        </div>
                     </div>
                     <div className="col-5">
                        <div className="form-floating">
                           <input type="time" className="form-control" required placeholder="x" name="entrada" defaultValue={user.entrada}/>
                           <label><FontAwesomeIcon icon={faDoorOpen}/> Entrada</label>
                        </div>
                     </div>
                     <div className="col-2">
                        <div className="form-floating">
                           <input type="color" name="cor" className="form-control form-control-color p-0 w-100" defaultValue={user.cor}></input>
                           <label><FontAwesomeIcon icon={faPaintbrush} /></label>
                        </div>
                     </div>               
               </div>
            </div>            
         </div>
      ))}
      <hr className="text-white"/>
      <div className="row g-2 mt-2 mb-4">

         <div className="col-12">
            <div className="form-floating">
               <input type="text" className="form-control" placeholder="x" name="novo_nome"/>
               <label><FontAwesomeIcon icon={faUser}/> Novo Colaborador(a)</label>
            </div>
         </div>
         <div className="col-5">
            <div className="form-floating">
               <input type="text" className="form-control" placeholder="x" name="nova_senha"/>
               <label><FontAwesomeIcon icon={faKey}/> Senha</label>
            </div>
         </div>
         <div className="col-5">
            <div className="form-floating">
               <input type="time" className="form-control" placeholder="x" name="nova_entrada"/>
               <label><FontAwesomeIcon icon={faDoorOpen}/> Entrada</label>
            </div>
         </div>
         <div className="col-2">
            <div className="form-floating">
               <input type="color" name="nova_cor" className="form-control form-control-color p-0 w-100" defaultValue="#563d7c"></input>
               <label><FontAwesomeIcon icon={faPaintbrush} /></label>
            </div>
         </div>
      </div>

      <div className="row g-2 mt-2 mb-4">
         <div className="col-12 mb-4 text-end">
            <Button type="submit" variant="success" className="text-white">
               <FontAwesomeIcon icon={faFloppyDisk} /> Salvar
            </Button>
         </div>
      </div>
      <br />
   </form>
   </>)
}
