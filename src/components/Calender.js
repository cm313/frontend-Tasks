import React from 'react'
import { Calendar } from 'fullcalendar'


 
document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar')
    const calendar = new Calendar(calendarEl, {
      initialView: 'dayGridMonth'
    })
    calendar.render();
  })

const Calender = () => {
  return (
    <div id='calendar' style={{border:'1px red black'}}></div>
  )
}

export default Calender;