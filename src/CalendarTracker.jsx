import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarTracker.css"; // Add custom styles if needed

const CalendarTracker = ({ moodData, habitData, expenseData }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatDate = (date) => date.toISOString().split("T")[0];

  const getDataForDate = (date) => {
    const formattedDate = formatDate(date);
    return {
      mood: moodData[formattedDate] || "No mood recorded",
      habits: habitData[formattedDate] || [],
      expenses: expenseData[formattedDate] || [],
    };
  };

  const selectedData = getDataForDate(selectedDate);

  return (
    <div className="calendar-tracker">
      <h2 className="title">📅 Calendar Tracker</h2>
      <div className="calendar-container">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          className="custom-calendar"
        />
      </div>
      <div className="details-container">
        <h3>Details for {formatDate(selectedDate)}</h3>
        {/* Mood Section */}
        <div className="section mood-section">
          <h4>Mood:</h4>
          <p>{selectedData.mood}</p>
        </div>
        {/* Habits Section */}
        <div className="section habit-section">
          <h4>Habits:</h4>
          {selectedData.habits.length > 0 ? (
            <ul>
              {selectedData.habits.map((habit, index) => (
                <li key={index}>{habit}</li>
              ))}
            </ul>
          ) : (
            <p>No habits recorded.</p>
          )}
        </div>
        {/* Expenses Section */}
        <div className="section expense-section">
          <h4>Expenses:</h4>
          {selectedData.expenses.length > 0 ? (
            <ul>
              {selectedData.expenses.map((expense, index) => (
                <li key={index}>
                  {expense.description}: ₹{expense.amount.toFixed(2)}
                </li>
              ))}
            </ul>
          ) : (
            <p>No expenses recorded.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarTracker;
