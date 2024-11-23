import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarTracker.css";

const CalendarTracker = () => {
  const [date, setDate] = useState(new Date());
  const [habit, setHabit] = useState("");
  const [mood, setMood] = useState("");
  const [expense, setExpense] = useState("");
  const [data, setData] = useState({}); // To store habits, moods, and expenses by date

  // Fetch data from localStorage on component mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("calendarData")) || {};
    setData(savedData);
  }, []);

  // Handle input changes
  const handleSave = () => {
    const formattedDate = date.toDateString(); // Format date as a string (e.g., "Mon Nov 13 2024")
    const newEntry = {
      habit,
      mood,
      expense,
    };

    // Update the data object
    const updatedData = { ...data, [formattedDate]: newEntry };
    setData(updatedData);

    // Save updated data to localStorage
    localStorage.setItem("calendarData", JSON.stringify(updatedData));

    // Clear input fields
    setHabit("");
    setMood("");
    setExpense("");
  };

  // Get details for the selected date
  const details = data[date.toDateString()] || {};

  return (
    <div className="calendar-tracker">
      <h1 className="calendar-header">Habit, Mood, and Expense Tracker</h1>

      {/* Calendar */}
      <div className="calendar">
        <Calendar onChange={setDate} value={date} />
      </div>

      {/* Input Section */}
      <div className="input-section">
        <h2>Add Details for {date.toDateString()}</h2>
        <input
          type="text"
          placeholder="Enter Habit"
          value={habit}
          onChange={(e) => setHabit(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Enter Mood"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="input-field"
        />
        <input
          type="number"
          placeholder="Enter Expense"
          value={expense}
          onChange={(e) => setExpense(e.target.value)}
          className="input-field"
        />
        <button onClick={handleSave} className="save-button">
          Save Details
        </button>
      </div>

      {/* Details Section */}
      <div className="calendar-details">
        <h3>Details for {date.toDateString()}:</h3>
        <p>
          <strong>Habit:</strong> {details.habit || "No habit recorded"}
        </p>
        <p>
          <strong>Mood:</strong> {details.mood || "No mood recorded"}
        </p>
        <p>
          <strong>Expense:</strong> {details.expense || "No expense recorded"}
        </p>
      </div>
    </div>
  );
};

export default CalendarTracker;
