// import FullCalendar from '@/app/components/FullCalendar';
'use client'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import brLocale from '@fullcalendar/core/locales/pt-br';
import ModalConfirm from "@/app/components/ModalConfirm";
import React, { useEffect, useState } from 'react';

export default function Calendario() {

   const [getDate, setGetDate] = useState(null)
   const [modal, setModal] = useState(false)
   const [events, setEvent] = useState([])
   const [users, setUsers] = useState([])
   const [folgas, setFolgas] = useState([]);

   const handleDateClick = (info) => {
      setFolgas(events.filter((folga) => folga.date === info.dateStr))
      setGetDate(info.dateStr)
      setModal(true)
   }

   useEffect(() => {
      const fetchData = async ()=>{
         try {
            const response = await fetch("/api/GetCalendario")
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
   }

   return (<>
      <div  style={{position:'relative', zIndex:0}}>
         <FullCalendar
            plugins={[ dayGridPlugin, interactionPlugin ]}
            editable
            selectable
            dateClick={handleDateClick}
            initialView="dayGridMonth"
            headerToolbar={{
               left: 'title',
               center: '',
               right: ''
            }}
            footerToolbar={{
               left: '',
               center: '',
               right: 'prev,next today'
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
