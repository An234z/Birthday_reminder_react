import React, { useState } from "react";
import Navbar from "./components/Navbar";
import BirthdayForm from "./components/BirthdayForm";
import BirthdayList from "./components/BirthdayList";
import ReminderForm from "./components/ReminderForm";
import "./index.css";

const App = () => {
  const [birthdays, setBirthdays] = useState([
    { id: 1, name: "Alice", date: "2024-05-12" },
    { id: 2, name: "Bob", date: "2024-06-30" },
  ]);
  const [isAdding, setIsAdding] = useState(false);

  const addBirthdayHandler = (birthdayData) => {
    setBirthdays((prevBirthdays) => [...prevBirthdays, birthdayData]);
    setIsAdding(false);
  };

  const startAddingHandler = () => {
    setIsAdding(true);
  };

  const stopAddingHandler = () => {
    setIsAdding(false);
  };

  return (
    <div className="app">
      <Navbar />
      
      <div className="birthday-app">
        {!isAdding && (
          <button onClick={startAddingHandler}>Add New Birthday</button>
        )}
        {isAdding && (
          <BirthdayForm
            onAddBirthday={addBirthdayHandler}
            onCancel={stopAddingHandler}
          />
        )}
        <BirthdayList birthdays={birthdays} />
        <ReminderForm />
      </div>

      <footer className="footer">
        <p>© 2024 All rights reserved</p>
      </footer>
    </div>
  );
};

export default App;
