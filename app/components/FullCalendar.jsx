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
      height: 500,
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
  }, []);

  return (
    <div ref={calendarRef}></div>
  );
};

export default FullCalendar;