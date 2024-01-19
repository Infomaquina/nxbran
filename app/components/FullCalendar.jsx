'use client'
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import brLocale from '@fullcalendar/core/locales/pt-br';
import { Calendar } from '@fullcalendar/core';
import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import ModalConfirm from "@/app/components/ModalConfirm"

const FullCalendar = () => {
   const calendarRef = useRef(null);
   const router = useRouter();
   const { data: session, status } = useSession();
   const [events, setEvent] = useState([])
   const [dataLoaded, setDataLoaded] = useState(false)
   const [modal, setModal] = useState(false)
   const [getDate, setGetDate] = useState(null)

   function closeModal(){
      setModal(false)
   }

   useEffect(() => {
      const fetchData = async ()=>{
         try {
            const response = await fetch("/api/GetFolgas")
            const dt = await response.json()
            console.log(dt);
            setEvent(dt)
            setDataLoaded(true)
         } catch (error) {
            console.log("Erro ao pegar folgas", error);
         }
      }

      if(!dataLoaded){
         fetchData()
      }

      const calendar = new Calendar(calendarRef.current, {
         locale: brLocale,
         height: 500,  
         dateClick: function(info) {
            if(session.user.level == 0){
               setGetDate(info.dateStr)
               setModal(true)         
            }
         },
         headerToolbar: {
            left: 'title',
            center: '',
            right: ''
         },
         footerToolbar: {
            left: '',
            center: '',
            right: 'prev,next today'
         },
         plugins: [dayGridPlugin, interactionPlugin],
         initialView: 'dayGridMonth',
         events: events
      });

      calendar.render();
   },[events,router,session,dataLoaded]);

   return (<>
      <div style={{position:'relative', zIndex:0}} ref={calendarRef}></div>
      {modal && <ModalConfirm date={getDate} close={closeModal} calendarRef={calendarRef} />}
   </>);
};

export default FullCalendar;