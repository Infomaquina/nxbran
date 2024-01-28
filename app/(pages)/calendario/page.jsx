// import FullCalendar from '@/app/components/FullCalendar';
'use client'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import brLocale from '@fullcalendar/core/locales/pt-br';
import ModalConfirm from "@/app/components/ModalConfirm";
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { revalidateTag } from 'next/cache'

export default function Calendario() {

   const [getDate, setGetDate] = useState(null)
   const [modal, setModal] = useState(false)
   const [events, setEvent] = useState([])
   const [users, setUsers] = useState([])
   const [folgas, setFolgas] = useState([]);
   const {data : session, status} = useSession();

   const handleDateClick = (info) => {
      if(session.user.level == 0){
         let data
         if(info.dateStr == undefined){
            let string = JSON.stringify(info.event.start).replace(/['"]/g, '');
            data = string.split('T')[0]
         }else{
            data = info.dateStr
         }
         setFolgas(events.filter((folga) => folga.date === data))
         setGetDate(data)
         setModal(true)      
      }
   }

   useEffect(() => {
      const fetchData = async ()=>{
         try {
            const response = await fetch("/api/GetCalendario", { cache: 'no-store' }, 
            { next: { tags: ['collection'] } })
            const dados = await response.json()
            setEvent(dados.folgas)
            setUsers(dados.users)
         } catch (error) {
            console.log("Erro ao pegar folgas", error);
         }
      }
      fetchData()
   },[getDate]);

   const closeModal = () => {
      setGetDate([])
      setModal(false)
      try{
         revalidateTag('collection')
      } catch (error) {
      }
   }

   return (<>
      <div style={{position:'relative', zIndex:0}}>
         <FullCalendar
            plugins={[ dayGridPlugin, interactionPlugin ]}
             titleFormat={{
               month: 'long',
               year: 'numeric'
            }}
            editable
            selectable
            aspectRatio={0.75}
            dateClick={handleDateClick}
            eventClick={handleDateClick}
            initialView="dayGridMonth"
            headerToolbar={{
               left: 'title',
               center: '',
               right: 'prev,next'
            }}
            locale={brLocale}
            events={events}
         />
      </div>
      {modal && 
         <ModalConfirm
            date={getDate} 
            users={users} 
            folgas={folgas}
            close={closeModal}
         />}
   </>);  
}
