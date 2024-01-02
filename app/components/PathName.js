'use client'
import {usePathname} from 'next/navigation'

export default function PathName() {

   const PathName = 
      {
         '/dashboard': 'Dashboard',
      }
   
   return (<><h1>{PathName[usePathname()]}</h1></>)}