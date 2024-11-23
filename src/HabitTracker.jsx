import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./HabitTracker.css";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const HabitTracker = () => {
  const [habits, setHabits] = useState(
    JSON.parse(localStorage.getItem("habits"))?.map((habit) => ({
      ...habit,
      progress: habit.progress || [], // Ensure progress is initialized as an array
    })) || []
  );
  const [habitName, setHabitName] = useState("");

  // Add a new habit
  const addHabit = () => {
    if (!habitName) {
      alert("Please enter a habit!");
      return;
    }

    const newHabit = { id: Date.now(), name: habitName, progress: [] };
    const updatedHabits = [...habits, newHabit];
    setHabits(updatedHabits);
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
    setHabitName("");
  };

  // Remove a habit
  const removeHabit = (habitId) => {
    const updatedHabits = habits.filter((habit) => habit.id !== habitId);
    setHabits(updatedHabits);
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
  };

  // Toggle completion for today's date
  const toggleCompletion = (habitId) => {
    const updatedHabits = habits.map((habit) => {
      if (habit.id === habitId) {
        const today = new Date().toDateString();
        if (habit.progress.includes(today)) {
          habit.progress = habit.progress.filter((date) => date !== today);
        } else {
          habit.progress.push(today);
        }
      }
      return habit;
    });
    setHabits(updatedHabits);
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
  };

  // Load habits from localStorage on initial render
  useEffect(() => {
    const savedHabits = JSON.parse(localStorage.getItem("habits")) || [];
    const sanitizedHabits = savedHabits.map((habit) => ({
      ...habit,
      progress: habit.progress || [],
    }));
    setHabits(sanitizedHabits);
  }, []);

  // Filter habits into completed and pending categories
  const today = new Date().toDateString();
  const completedHabits = habits.filter((habit) =>
    habit.progress.includes(today)
  );
  const pendingHabits = habits.filter(
    (habit) => !habit.progress.includes(today)
  );

  // Chart Data
  const chartData = {
    labels: habits.map((habit) => habit.name),
    datasets: [
      {
        label: "Completion Rate",
        data: habits.map((habit) => habit.progress.length),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="habit-tracker">
      <h2 className="title">Daily Habit Tracker</h2>
      <div className="habit-inputs">
        <input
          type="text"
          placeholder="Enter a new habit"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
          className="habit-input"
        />
        <button onClick={addHabit} className="add-habit-btn">
          Add Habit
        </button>
      </div>

      {/* Pending Habits */}
      <div className="habit-section">
        <h3>Pending Habits</h3>
        {pendingHabits.map((habit) => (
          <div key={habit.id} className="habit-item">
            <span>{habit.name}</span>
            <button
              onClick={() => toggleCompletion(habit.id)}
              className="toggle-btn"
            >
              ✅
            </button>
            <button
              onClick={() => removeHabit(habit.id)}
              className="remove-btn"
            >
              ✖️
            </button>
          </div>
        ))}
      </div>

      {/* Completed Habits */}
      <div className="habit-section completed-section">
        <h3>Completed Habits</h3>
        {completedHabits.map((habit) => (
          <div key={habit.id} className="habit-item">
            <span>{habit.name}</span>
            <button
              onClick={() => toggleCompletion(habit.id)}
              className="toggle-btn completed"
            >
              Undo
            </button>
            <button
              onClick={() => removeHabit(habit.id)}
              className="remove-btn"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="chart-container">
        <Doughnut data={chartData} />
      </div>
    </div>
  );
};

export default HabitTracker;