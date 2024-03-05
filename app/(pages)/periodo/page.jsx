'use client'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import brLocale from '@fullcalendar/core/locales/pt-br';
import ModalPeriodo from "@/app/components/ModalPeriodo";
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export const revalidate = true

export default function Calendario() {

   const [getDate, setGetDate] = useState(null)
   const [modal, setModal] = useState(false)
   const [events, setEvent] = useState([])
   const {data : session, status} = useSession();
   const [updateEvents, setUpdateEvents] = useState(false)

   const handleDateClick = (info) => {
      if(session.user.level == 0){
         let data
         if(info.dateStr == undefined){
            let string = JSON.stringify(info.event.start).replace(/['"]/g, '');
            data = string.split('T')[0]
         }else{
            data = info.dateStr
         }
         // setFolgas(events.filter((folga) => folga.date === data))
         setGetDate(data)
         setModal(true)      
      }
   }

   useEffect(() => {
      const fetchData = async ()=>{
         try {
            const response = await fetch("/api/GetPeriodo",{
               method: 'PUT'
            })
            const dados = await response.json()
            setEvent(dados.query)
            console.log('Coletou nvoso eventos');
         } catch (error) {
            console.log("Erro ao pegar folgas", error);
         }
      }
      fetchData()
   }, [getDate, updateEvents]);

   const closeModal = () => {
      setGetDate([])
      setModal(false)
   }

   const closeUpdate = () => {
      setUpdateEvents((prev) => !prev)
      closeModal()
   };

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
            eventOrder={'color'}
            eventContent= {function(arg) {
            return {
               html: '<div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">' +
                  arg.event.title.split(' ').join('<br>') +
                  '</div>'
            };
            }}
         />
      </div>
      {modal && <ModalPeriodo
         date={getDate}
         close={closeModal}
         closeUpdate={closeUpdate}
      />}
   </>);  
}
