'use client'
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import brLocale from '@fullcalendar/core/locales/pt-br';
import { Calendar } from '@fullcalendar/core';
import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";

const FullCalendar = () => {
   const calendarRef = useRef(null);
   const router = useRouter();
   const { data: session, status } = useSession();

  useEffect(() => {
    const calendar = new Calendar(calendarRef.current, {
      locale: 'brLocale',
      height: 500,  
      dateClick: function(info) {
         if(session.user.level == 0){
            router.push('/calendario/confirm?data='+info.dateStr, { scroll: false })         
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
      events: [
        { title: 'Cíntia', date: '2024-01-10', color: 'red' },
        { title: 'Bia', date: '2024-01-10', color: 'green' },
        { title: 'Bia', date: '2024-01-11', color: 'green' },
        { title: 'Bia', date: '2024-01-12', color: 'green' },
        { title: 'Jana', date: '2024-01-01', color: 'purple' }
      ]
    });
    calendar.render();
  });

  return (
    <div style={{position:'relative', zIndex:0}} ref={calendarRef}></div>
  );
};

export default FullCalendar;