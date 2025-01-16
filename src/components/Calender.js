import React,{useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import {Modal, Button, DatePicker, Form, Space, TimePicker} from 'antd';
import dayjs from "dayjs";


const Calender = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([{ key: Date.now(), startTime: null, endTime: null }]);

  const handleDateClick =(info)=>{
    setSelectedDate(dayjs(info.dateStr));
    showModel();
  }

  const showModel = ()=>{
    setIsModalVisible(true);
  }

  const handleCancel = () => {
    setIsModalVisible(false);
    setTimeSlots([{ key: Date.now(), startTime: null, endTime: null }]);
  };

  const addTimeSlot = () => {
    setTimeSlots([...timeSlots, { key: Date.now(), startTime: null, endTime: null }]);
  };

  const handleTimeChange = (index, type, value) => {
    const updatedSlots = [...timeSlots];
    updatedSlots[index][type] = value;
    setTimeSlots(updatedSlots);
  };

  const handleApply = () => {
    console.log("Selected Date:", selectedDate);
    console.log("Time Slots:", timeSlots);
    // TODO: Update FullCalendar events here
    setIsModalVisible(false);
  };



  return (
    <div>
    <FullCalendar plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
    initialView={'dayGridMonth'}
    headerToolbar={{
      start: "today prev,next",
      center: "title",
      end: "dayGridMonth,timeGridWeek,timeGridDay"
    }}
    height={"90vh"}
    dateClick={handleDateClick}
    /> 
   
   <Modal
        title={`Edit Date: ${selectedDate}`}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="apply" type="primary" onClick={handleApply}>
            Apply
          </Button>,
        ]}
      >
        {/* Small Calendar */}
        <DatePicker defaultValue={selectedDate ? selectedDate : null}/>

        {/* Time Slots */}
        <Form layout="vertical">
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