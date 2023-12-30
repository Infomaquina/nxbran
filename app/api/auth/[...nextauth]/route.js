import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import executeQuery from '../../../../database/sql'
import bcrypt from 'bcrypt';
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
         email: { label: 'Email', type: 'text' },
         password: { label: 'Senha', type: 'password' }
      },

      async authorize(credentials, req) {
         try {            
            let user = await executeQuery("SELECT * FROM users WHERE email = ?", [credentials.email]);

            if (user[0].name == undefined || !(await bcrypt.compare(credentials.password, user[0].password))) {
               return null;
            }

            const token = generateAccessToken(user[0]);
            await executeQuery("UPDATE users SET token = ? WHERE id = ?", [token, user[0].id]);
            // user[0].token = token;

            return user[0]  

         } catch (error) {
            console.error("Erro em authorize", error);
            return null;
         }
      }
    }),
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET
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
         session.user.level = token.user.level,
         session.user.status = token.user.status,
         session.user.token = token.user.token 
         return session
      }
  }
}

const handler = NextAuth(authOptions) 

export {handler as GET, handler as POST}