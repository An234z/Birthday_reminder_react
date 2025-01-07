import React, { useState } from "react";
import "./Forms.css";

const BirthdayList = ({ birthdays }) => {
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
