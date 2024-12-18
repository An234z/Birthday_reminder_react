import React from "react";
import Navbar from "./components/Navbar";
import BirthdayForm from "./components/BirthdayForm";
import BirthdayList from "./components/BirthdayList"
import ReminderForm from "./components/ReminderForm";
import "./index.css";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="container">
        <BirthdayForm />
        <BirthdayList />
        <ReminderForm />
      </div>
      <footer className="footer">
        <p>© 2024 All rights reserved</p>
      </footer>
    </div>
  );
};

export default App;
