import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import executeQuery from '../../../../database/sql'
import bcrypt from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
         email: { label: 'Email', type: 'text' },
         password: { label: 'Senha', type: 'password' }
      },

      async authorize(credentials, req) {
         try {            
            let user = await executeQuery("SELECT * FROM users WHERE email = ?", [credentials.email]);

            if (user[0].name == undefined || !(await bcrypt.compare(credentials.password, user[0].password))) {
               return null;
            }
            return user[0]  

         } catch (error) {
            console.error("Erro em authorize", error);
            return null;
         }
      }
    })
  ],
  callbacks: {
      async jwt({token, user}){
         user && (token.user = user)
         return token
      },
      async session({ session, token }){
         session = token.user
         return session
      }
  }
}

const handler = NextAuth(authOptions) 

export {handler as GET, handler as POST}