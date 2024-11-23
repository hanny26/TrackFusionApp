import MoodTracker from "./HabitTracker";
import HabitTracker from "./MoodTracker";
import './App.css'; // Import custom CSS
import { motion } from "framer-motion";
import ExpenseTracker from "./ExpenseTracker";
const App = () => {
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Personal Dashboard📈</h1>
      <div className="dashboard-grid">
        <MoodTracker />
        <HabitTracker />
        <ExpenseTracker />
      </div>
    </div>
  );
};

export default App;