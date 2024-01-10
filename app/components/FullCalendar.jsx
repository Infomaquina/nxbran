'use client'
import React, { useRef, useEffect } from 'react';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import brLocale from '@fullcalendar/core/locales/pt-br';

const FullCalendar = () => {
  const calendarRef = useRef(null);

  useEffect(() => {
    const calendar = new Calendar(calendarRef.current, {
      locale: 'brLocale',
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
        { title: 'Cíntia', date: '2024-01-10' },
        { title: 'Bia', date: '2024-01-10' },
        { title: 'Bia', date: '2024-01-11' },
        { title: 'Bia', date: '2024-01-12' }
      ]
    });
    calendar.render();
  }, []);

  return (
    <div ref={calendarRef}></div>
  );
};

export default FullCalendar;