import React, { useState } from "react";
import "./Forms.css";

const BirthdayForm = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Added Birthday:\nName: ${name}\nDate: ${date}`);
    setName("");
    setDate("");
  };

  return (
    <div className="birthday-box">
      <h2>Add Birthday!</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Birthday Kid:</label>
        <input
        className='input'
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add name"
          required
        />
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Add New Birthday</button>
      </form>
    </div>
  );
};

export default BirthdayForm;
