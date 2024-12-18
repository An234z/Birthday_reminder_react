import React, { useState } from "react";
import "./Forms.css";

const BirthdayList = () => {
  const [birthdays, setBirthdays] = useState([
    { id: 1, name: "Alice", date: "2024-05-12" },
    { id: 2, name: "Bob", date: "2024-06-30" },
  ]);

  return (
    <div className="birthday-list-box">
      <h2>Birthdays</h2>
      <ul>
        {birthdays.map((bday) => (
          <li key={bday.id}>
            <strong>{bday.name}</strong> - {bday.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BirthdayList;
