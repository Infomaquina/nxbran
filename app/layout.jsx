import { Inter } from 'next/font/google'
import './styles/globals.css'
import NextAuthSessionProvider from './api/auth/[...nextauth]/provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children}) {
   return (
      <html lang="pt-br">
         <body className={inter.className}>
            <NextAuthSessionProvider>
               {children}
            </NextAuthSessionProvider>
         </body>
      </html>
   )
}