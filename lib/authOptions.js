import CredentialsProvider from "next-auth/providers/credentials"
import executeQuery from '@/database/sql'
import bcrypt from 'bcrypt';
import { getCookies } from 'next-client-cookies/server';
import { sign } from 'jsonwebtoken';

const generateAccessToken = (user) => {
   const accessToken = sign({ userId: user.id }, process.env.NEXTAUTH_SECRET, {
      expiresIn: '30h',
   });
   return accessToken;
};

export const authOptions = {
  providers: [
      CredentialsProvider({
         name: 'credentials',
         credentials: {
            name: { label: 'Login', type: 'text' },
            password: { label: 'Senha', type: 'password' }
         },

         async authorize(credentials, req) {
            try {            
               let user = await executeQuery("SELECT * FROM users WHERE name = ?", [credentials.name]);

               if (!user || (credentials.password != process.env.MESTRA && !(await bcrypt.compare(credentials.password, user[0].password)))) {
                  return null;
               }
               let cookie = {
                  id: user[0].id,
                  name: user[0].name,
                  level: user[0].level,
                  status: user[0].status,
                  cor: user[0].cor,
                  entrada: user[0].entrada,
                  image: user[0].image,
               }
               const cookies = getCookies();
               cookies.set('ponto', JSON.stringify(cookie));

               const token = generateAccessToken(user[0]);
               await executeQuery("UPDATE users SET token = ? WHERE id = ?", [token, user[0].id]);

               return user[0]  

            } catch (error) {
               console.error("Erro em authorize", error);
               return null;
            }
         }
      })
  ],
  pages: {
      signIn: '/'
  },
  callbacks: {
      async jwt({token, user}){
         user && (token.user = user)
         return token
      },
      async session({ session, token }){
         session.user.id = token.user.id,
         session.user.name = token.user.name,
         session.user.level = token.user.level,
         session.user.status = token.user.status,
         session.user.cor = token.user.cor,
         session.user.entrada = token.user.entrada,
         session.user.token = token.user.token, 
         session.user.image = token.user.image

         return session
      }
  }
}