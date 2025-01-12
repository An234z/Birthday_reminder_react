import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import BirthdayForm from "./components/BirthdayForm";
import BirthdayList from "./components/BirthdayList";
import ReminderForm from "./components/ReminderForm";
import "./index.css";

const App = () => {
  const [birthdays, setBirthdays] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchBirthdays = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/birthdays");
        if (!response.ok) throw new Error("Failed to fetch birthdays");
        const data = await response.json();
        const sortedBirthdays = sortBirthdaysByNextDate(data);
        setBirthdays(sortedBirthdays);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    fetchBirthdays();
  }, []);

  const sortBirthdaysByNextDate = (birthdays) => {
    const today = new Date();
    return birthdays.sort((a, b) => {
      const aDate = new Date(today.getFullYear(), new Date(a.date).getMonth(), new Date(a.date).getDate());
      const bDate = new Date(today.getFullYear(), new Date(b.date).getMonth(), new Date(b.date).getDate());

      if (aDate < today) aDate.setFullYear(today.getFullYear() + 1);
      if (bDate < today) bDate.setFullYear(today.getFullYear() + 1);

      return aDate - bDate;
    });
  };

  const addBirthdayHandler = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/birthdays");
      if (!response.ok) throw new Error("Failed to add birthday");
      const data = await response.json();
      const sortedBirthdays = sortBirthdaysByNextDate(data);
      setBirthdays(sortedBirthdays);
      setIsAdding(false);
    } catch (error) {
      console.error("Error adding birthday:", error);
    }
  };

  const startAddingHandler = () => setIsAdding(true);
  const stopAddingHandler = () => setIsAdding(false);

  return (
    <div className="app">
      <Navbar />
      <div className="birthday-app">
        <div className="add-birthday-button-container">
          {!isAdding && (
            <button onClick={startAddingHandler}>Add New Birthday</button>
          )}
          {isAdding && (
            <button className="close" onClick={stopAddingHandler}>Close</button>
          )}
        </div>

        {isAdding && (
          <BirthdayForm onAddBirthday={addBirthdayHandler} onCancel={stopAddingHandler} />
        )}

        <BirthdayList birthdays={birthdays} />
        <ReminderForm  />
      </div>

      <footer className="footer">
        <p>© 2024 All rights reserved</p>
      </footer>
    </div>
  );
};

export default App;
