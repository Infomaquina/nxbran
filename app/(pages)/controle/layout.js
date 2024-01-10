import { getCookies } from 'next-client-cookies/server';

export default function layout({children, modal}) {

   const cookies = getCookies();
   console.log(cookies.get('ponto'));
   
   return (<>
      {children}
      {modal}
   </>)}
