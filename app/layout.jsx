import { Inter } from 'next/font/google'
import './styles/globals.css'
import NextAuthSessionProvider from './api/auth/[...nextauth]/provider'
import { CookiesProvider } from 'next-client-cookies/server';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
   metadataBase: new URL('https://santalolla.vercel.app/'),
   generator: 'Next.js',
   title: 'SantaLolla',
   description: 'Ponto app',
   keywords: ['Brandev', 'Ponto', 'Santa Lolla'],
   creator: 'Anderson Brandão',
   publisher: 'Anderson Brandão',
   openGraph: {
      title: 'SantaLolla',
      description: 'Ponto SantaLolla',
      url: 'https://santalolla.vercel.app/img/pwa/512.png',
      siteName: 'https://santalolla.vercel.app/',
      images: [
         {
         url: 'https://santalolla.vercel.app/img/pwa/512.png',
         width: 512,
         height: 512,
         alt: 'SantaLolla',
         },
      ],
      locale: 'pt-br',
      type: 'website',
   },
   icons: {
   icon: '/img/icon.ico',
   shortcut: '/img/icon.ico',
   apple: '/img/icon.ico',
   other: {
   rel: 'apple-touch-icon-precomposed',
   url: '/img/icon.ico',
   },
   manifest: '/app.webmanifest',
},
}

export default function RootLayout({ children }) {
   return (
      <html lang="pt-br">
         <body className={inter.className}>
            <NextAuthSessionProvider>
               <CookiesProvider>
                  {children}
               </CookiesProvider>
            </NextAuthSessionProvider>
         </body>
      </html>
   )
}
