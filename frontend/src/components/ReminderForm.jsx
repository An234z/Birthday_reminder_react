import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import axios from "axios";
import "./Forms.css";
import { useEffect } from "react";

const ReminderForm = () => {
  const [email, setEmail] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [birthdays, setBirthdays] = useState([]);

  useEffect(() => {
    const fetchBirthdays = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/birthdays");
        setBirthdays(response.data);
      } catch (error) {
        console.error("Error fetching birthday data:", error);
      }
    };

    fetchBirthdays();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const reminderData = {
        email,
        birthdays: birthdays,
      };

      await axios.post("http://localhost:5000/api/reminders", reminderData);
      console.log(reminderData);

      const serviceId = "service_oj9cxli";
      const templateId = "template_lxqf95z";
      const publicKey = "hsu5yaPgiMHtRBcXk";

      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          email: email,
          message: `You will recive weekly reminders!🎉`,
          from_name: "BirthdayReminder",
        },
        publicKey
      );

      console.log("Email sent successfully:", result.text);
      alert("You will receive weekly birthday reminders!");
      setIsRegistered(true);
    } catch (error) {
      console.error("Error registering or sending email:", error);
      alert("Failed to register for reminders. Please try again.");
    }
  };

  return (
    <div className="reminder-box">
      <h2>
        {isRegistered ? "You're all set!" : "Get a weekly birthday reminder!"}
      </h2>
      {!isRegistered && (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
          />
          <button type="submit">Get Reminder</button>
        </form>
      )}
    </div>
  );
};

export default ReminderForm;
