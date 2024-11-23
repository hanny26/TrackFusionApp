import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import calendar styles
import './Calendar.css';

const CalendarComponent = ({ events }) => {
  const [date, setDate] = useState(new Date()); // Current date
  const [selectedEvents, setSelectedEvents] = useState([]);

  // Event data could come from localStorage or API, for now, using an example
  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setSelectedEvents(savedEvents);
  }, []);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    // Filter events for the selected date
    const dateString = newDate.toDateString();
    const filteredEvents = selectedEvents.filter(event => event.date === dateString);
    setSelectedEvents(filteredEvents);
  };

  const addEvent = (date) => {
    const eventDescription = prompt("Enter event description:");
    if (eventDescription) {
      const newEvent = {
        id: Date.now(),
        date: date.toDateString(),
        description: eventDescription,
      };
      const updatedEvents = [...selectedEvents, newEvent];
      setSelectedEvents(updatedEvents);
      localStorage.setItem("events", JSON.stringify(updatedEvents));
    }
  };

  return (
    <div className="calendar-container">
      <h2>Track Your Events</h2>
      <Calendar
        onChange={handleDateChange}
        value={date}
      />
      <div className="events-list">
        <h3>Events on {date.toDateString()}</h3>
        <ul>
          {selectedEvents.map((event) => (
            <li key={event.id}>{event.description}</li>
          ))}
        </ul>
        <button onClick={() => addEvent(date)}>Add Event</button>
      </div>
    </div>
  );
};

export default CalendarComponent;
