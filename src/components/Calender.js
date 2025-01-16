import React,{useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import {Modal, Button, Form, Space, TimePicker, Calendar} from 'antd';
import dayjs from "dayjs";
import { CloseOutlined } from '@ant-design/icons';


const Calender = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isOptionsModelVisible, setIsOptionsModelVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isCalendarVisible, setIsCalendarVisible]= useState(true);
  const [timeSlots, setTimeSlots] = useState([{ key: Date.now(), startTime: null, endTime: null }]);
  const [events, setEvents] = useState([]);

  const handleDateClick =(info)=>{
    setSelectedDate(dayjs(info.dateStr));
    const day = getDayFromDate(info.dateStr)
    setSelectedDay(day);
    setIsOptionsModelVisible(true);
   
  }

  const handleEditDateClick = ()=>{
    setIsModalVisible(true);
    setIsOptionsModelVisible(false);
    setIsCalendarVisible(true);
  }

  const handleEditAllDaysClick = ()=>{
    setIsModalVisible(true);
    setIsCalendarVisible(false);
    setIsOptionsModelVisible(false);
  }

  const getDayFromDate = (dateString) => {
    const date = new Date(dateString);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[date.getDay()];
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setTimeSlots([{ key: Date.now(), startTime: null, endTime: null }]);
  };

  const handleOptionsCancel = ()=>{
    setIsOptionsModelVisible(false);
  }

  const addTimeSlot = () => {
    setTimeSlots([...timeSlots, { key: Date.now(), startTime: null, endTime: null }]);
  };

  const handleTimeChange = (index, type, value) => {
    const updatedSlots = [...timeSlots];
    updatedSlots[index][type] = value;
    setTimeSlots(updatedSlots);
  };

  const handleApply = () => {
    const formattedSlots = timeSlots.map((slot) => ({
      title: `${slot.startTime ? slot.startTime.format("HH:mm") : "Unknown"} - ${
        slot.endTime ? slot.endTime.format("HH:mm") : "Unknown"
      }`,
      start: selectedDate.toDate(), // Set the start of the event to the selected date
      extendedProps: {
        startTime: slot.startTime ? slot.startTime.format("HH:mm") : "Unknown",
        endTime: slot.endTime ? slot.endTime.format("HH:mm") : "Unknown",
      },
    }));

    // Add new events to the state
    setTimeSlots([{ key: Date.now(), startTime: null, endTime: null }]);
    setEvents((prevEvents) => [...prevEvents, ...formattedSlots]);
    setIsModalVisible(false);
  };

  const handleTimeSlotDelete = (key)=>{
    if(timeSlots.length !== 1){
    const updatedSlots =
        timeSlots.filter((slot)=>(slot.key !== key))
        setTimeSlots(updatedSlots);
    }
    else{
      return;
    }
  }



  return (
    <div    style={{ width: "70%", height: "80vh", margin: "0 auto", marginTop: '10px' }}>
    <FullCalendar plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
    initialView={'dayGridMonth'}
    events={events}
    headerToolbar={{
      start: "today prev,next",
      center: "title",
      end: "dayGridMonth,timeGridWeek,timeGridDay"
    }}
    dateClick={handleDateClick}
     eventContent={(eventInfo) =>(
          <div>
            {eventInfo.event.extendedProps.startTime} - {eventInfo.event.extendedProps.endTime}
          </div>
        )}
    /> 

    <Modal title={'Choose between:'} 
      open={isOptionsModelVisible}
      onCancel={handleOptionsCancel}
      >
        <div>
          <p onClick={handleEditDateClick} style={{cursor:'pointer'}}>Edit date</p>
          <p onClick={handleEditAllDaysClick} style={{cursor:'pointer'}}>Edit all {selectedDay}s</p>
        </div>
    </Modal>
   
   <Modal
        title={isCalendarVisible ? `Edit Date: ${selectedDate}`: `Edit All ${selectedDay}s`}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="apply" type="primary" onClick={handleApply}>
            Apply
          </Button>
        ]}
      >
      {
     isCalendarVisible &&  <Calendar fullscreen={false} value={selectedDate}/>
      }

      <div>Choose your availability timings:</div>
        {/* Time Slots */}
        <Form style={{marginTop: 8}} layout="vertical">
          {timeSlots.map((slot, index) => (
            <Space key={slot.key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
              <TimePicker
                placeholder="Start Time"
                value={slot.startTime}
                onChange={(value) => handleTimeChange(index, "startTime", value)}
              />
              <TimePicker
                placeholder="End Time"
                value={slot.endTime}
                onChange={(value) => handleTimeChange(index, "endTime", value)}
              />
               <CloseOutlined onClick={()=>{handleTimeSlotDelete(slot.key)}} />
              {index === timeSlots.length - 1 && (
                <Button type="dashed" onClick={addTimeSlot}>
                  +
                </Button>
              )}
            </Space>
          ))}
        </Form>
      </Modal>

    </div>
  );
}

export default Calender;