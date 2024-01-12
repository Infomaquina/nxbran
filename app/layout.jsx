import { Inter } from 'next/font/google'
import './styles/globals.css'
import NextAuthSessionProvider from './api/auth/[...nextauth]/provider'
import { CookiesProvider } from 'next-client-cookies/server';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
   metadataBase: new URL('https://localhost:3000'),
   generator: 'Next.js',
   title: 'Ponto',
   description: 'Brandev app',
   keywords: ['Brandev', 'Ponto', 'Santa Lolla'],
   creator: 'Anderson Brandão',
   publisher: 'Anderson Brandão',
   openGraph: {
      title: 'Ponto',
      description: 'Ponto Brandev',
      url: '/img/pwa/512.png',
      siteName: 'Ponto.Brandev',
      images: [
         {
         url: '/img/pwa/512.png', // Must be an absolute URL
         width: 512,
         height: 512,
         alt: 'Brandev',
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
