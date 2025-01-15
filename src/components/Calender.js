import React from 'react'
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';


 


const Calender = () => {

useEffect(()=>{
    document.addEventListener('DOMContentLoaded', function() {
        const calendarEl = document.getElementById('calendar')
        const calendar = new Calendar(calendarEl, {
            plugins: [dayGridPlugin, interactionPlugin],
          initialView: 'dayGridWeek',
          editable: true,
          selectable: true,
          dateClick: function(info) {
            alert('Date clicked: ' + info.dateStr);
          }
        });
        calendar.render();
      });
},[])

  return (
    <div id='calendar' style={{border:'1px red black'}}></div>
  )
}

export default Calender;