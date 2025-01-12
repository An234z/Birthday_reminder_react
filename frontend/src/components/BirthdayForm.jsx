import React, { useState } from "react";

const BirthdayForm = ({ onAddBirthday }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBirthday = {
      name,
      date
    };

    try {
      const response = await fetch("http://localhost:5000/api/birthdays", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBirthday),
      });

      if (response.ok) {
        alert("Birthday added successfully!");
        onAddBirthday(); 
        setName("");
        setDate("");
      } else {
        alert("Failed to add birthday");
      }
    } catch (error) {
      console.error("Error adding birthday:", error);
    }
  };

  return (
    <div className="birthday-box">
      <h2>Add a Birthday</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Add Birthday</button>
      </form>
    </div>
  );
};

export default BirthdayForm;
