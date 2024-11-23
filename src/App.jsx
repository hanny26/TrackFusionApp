import MoodTracker from "./HabitTracker";
import HabitTracker from "./MoodTracker";
import './App.css'; // Import custom CSS
import { motion } from "framer-motion";
import ExpenseTracker from "./ExpenseTracker";
import { useState, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.css';

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
  const [thought, setThought] = useState("");
  const [savedThought, setSavedThought] = useState("");

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
    // Load saved thought for the new date
    const saved = localStorage.getItem(`${newDate}-thought`);
    if (saved) {
      setSavedThought(saved);
      setThought(saved); // Set the input value to the saved thought
    } else {
      setSavedThought(""); // Clear if no thought exists for the new date
      setThought(""); // Clear the input for the new date
    }
  };

  const handleThoughtChange = (event) => {
    setThought(event.target.value);
  };

  const handleSaveThought = () => {
    // Save the current thought for the selected date
    localStorage.setItem(`${selectedDate}-thought`, thought);
    setSavedThought(thought); // Update the displayed saved thought
    setThought(""); // Clear the input field
  };

  const handleRemoveThought = () => {
    localStorage.removeItem(`${selectedDate}-thought`);
    setSavedThought(""); // Clear the state for removed thought
    setThought(""); // Clear input field
  };

  useEffect(() => {
    // Load thought for the initially selected date
    const saved = localStorage.getItem(`${selectedDate}-thought`);
    if (saved) {
      setSavedThought(saved);
      setThought(saved); // Populate the textarea with the saved thought
    }
  }, [selectedDate]);

  return (
    
    <div className="dashboard">
      
      <h1 className="dashboard-title">Personal Dashboard📈</h1>
      <div className="date-thought-container">
        <div className="date-picker">
          <input
            type="date"
            onChange={handleDateChange}
            value={new Date(selectedDate).toISOString().split('T')[0]}
          />
        </div>

        {/* Thoughts Section */}
        <div className="thought-section">
          <textarea
            className="thought-input"
            value={thought}
            onChange={handleThoughtChange}
            placeholder="Add your thoughts... Write something inspiring or reflective!"
          />
          <div className="thought-buttons">
            <motion.button
              className="save-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSaveThought}
            >
              Save Thought
            </motion.button>
            {thought && (
              <motion.button
                className="remove-button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRemoveThought}
              >
                Remove Thought
              </motion.button>
            )}
          </div>
        </div>
      {savedThought && (
        <div className="saved-thought">
          <h3>Your Thought for {selectedDate}:</h3>
          <p className="thought-content">{savedThought}</p>
        </div>
      )}
      </div>
      {/* Display saved thought for the selected date */}

      <div className="dashboard-grid">
        <MoodTracker />
        <HabitTracker />
        <ExpenseTracker />
      </div>

      <footer className="footer">
  <div className="footer-content">
    <p>Created by <strong>Hanny Vyas</strong></p>
    <div className="footer-icons">
      <a href="https://github.com/hanny26" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-github"></i>
      </a>
      <a href="https://www.linkedin.com/in/hanny-vyas/" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-linkedin"></i>
      </a>
      <a href="https://x.com/HannyVyas3" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-twitter"></i>
      </a>
    </div>
    <p className="footer-tagline">Building the future, one line of code at a time ✨</p>
  </div>
</footer>

    </div>

    
  );
};

export default App;
