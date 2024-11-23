import React, { useState, useEffect } from "react";
import "../style/ExpenseTracker.css";

const ExpenseTracker = ({ selectedDate }) => {
  // Fetch expenses from localStorage, filtered by selectedDate
  const [expenses, setExpenses] = useState(
    JSON.parse(localStorage.getItem(`${selectedDate}-expenses`)) || []
  );
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const addExpense = () => {
    if (!amount || !description) {
      alert("Please fill out all fields!");
      return;
    }

    const newExpense = {
      id: Date.now(),
      amount: parseFloat(amount),
      description,
      date: selectedDate,
    };

    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    localStorage.setItem(`${selectedDate}-expenses`, JSON.stringify(updatedExpenses));
    setAmount("");
    setDescription("");
  };

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
    localStorage.setItem(`${selectedDate}-expenses`, JSON.stringify(updatedExpenses));
  };

  useEffect(() => {
    // Sync expenses on date change
    const savedExpenses = JSON.parse(localStorage.getItem(`${selectedDate}-expenses`));
    if (savedExpenses) {
      setExpenses(savedExpenses);
    }
  }, [selectedDate]); // Re-run when selectedDate changes

  const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <div className="expense-tracker">
      <h2 className="title">Expense Tracker</h2>
      <div className="expense-inputs">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="expense-input"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="expense-input"
        />
        <button onClick={addExpense} className="add-expense-btn">
          Add Expense
        </button>
      </div>
      <div className={`total-expense ${totalExpense > 5000 ? "warning" : ""}`}>
        <h3>
          Total Spent: ₹{totalExpense.toFixed(2)}
          {totalExpense > 100000 && (
            <span className="warning-text"> - Warning! Expenses exceed ₹100000</span>
          )}
        </h3>
      </div>
      <ul className="expense-list">
        {expenses.map((expense) => (
          <li key={expense.id} className="expense-item">
            <span>{expense.description}</span>
            <span>₹{expense.amount.toFixed(2)}</span>
            <button onClick={() => deleteExpense(expense.id)} className="delete-btn">
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseTracker;
