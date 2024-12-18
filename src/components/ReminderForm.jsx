import React, { useState } from "react";
import "./Forms.css"

const ReminderForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Reminder set for email: ${email}`);
    setEmail("");
  };

  return (
    <div className="reminder-box">
      <h2>Get a reminder for the upcoming birthday!</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Enter your email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          required
        />
        <button type="submit">Get Reminder</button>
      </form>
    </div>
  );
};

export default ReminderForm;
