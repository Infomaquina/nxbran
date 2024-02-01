import bcrypt from 'bcrypt';
import Link from 'next/link';
import Image from 'next/image';
import UserSession from "@/app/components/UserSession"
import executeQuery from "@/database/sql"
import { redirect } from "next/navigation"
import { revalidatePath } from 'next/cache';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons"
import { faPaintbrush } from "@fortawesome/free-solid-svg-icons"
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { faKey } from "@fortawesome/free-solid-svg-icons"
import { cookies } from 'next/headers'


export default async function user() {
   const session = await UserSession()
   
   let users = []
   if(session.user.level == 0) {
      users = await executeQuery("SELECT * FROM users")
   }else{
      users = [session.user]
   }

   async function formAction(formData) {
      'use server'

      if(session.user.level == 0){
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

      session.user.level == 0 ? revalidatePath('/user') : sair();
      function sair(){
         cookies().delete('__Secure-next-auth.session-token')
         redirect('/')
      }
   }


   return (<>
   <form action={formAction} style={{position:'relative', zIndex:0}}>
      {users.map((user) => (
         <div key={user.id} className="card shadow my-3 bg-light">
            <div className="card-body">
               <div className="row g-2">  
                  <input type="hidden" name="id_user" value={user.id} />
                  <div className="col-12">            
                     <div className="input-group">                        
                        <Link href={"/user/confirm?id="+user.id}>
                           <Image
                              src={user.image+'?'+new Date().getTime()}
                              className="rounded-start p-0 input-group-text"
                              alt="User Image"
                              height={60}
                              width={60}
                              style={{ cursor: "pointer" }}/>
                        </Link>
                        {/* <UploadImage id={user.id} /> */}
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
      {session.user.level == 0 ? (<>
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
      </>) : null}
         <div className="row g-2 mt-2 mb-4">
            <div className="col-12 mb-4 text-end">
               <button type="submit" className="btn btn-success shadow">
                  <FontAwesomeIcon icon={faFloppyDisk} /> Salvar
               </button>
            </div>
         </div> 
      <br />
   </form>
   </>)
}
