import express from "express";
import cors from "cors";
import fs from "fs";
import "./scheduler.js"; // Import the scheduler to run automatically

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


const remindersFilePath = "./reminders.json";

// Helper to load reminders
const getRemindersData = () => {
  const data = fs.readFileSync(remindersFilePath);
  return JSON.parse(data);
};

// Helper to save reminders
const saveRemindersData = (data) => {
  fs.writeFileSync(remindersFilePath, JSON.stringify(data, null, 2));
};

// Serve all birthdays
app.get("/api/birthdays", (req, res) => {
    try {
        const birthdays = JSON.parse(fs.readFileSync("./data.json"));
        res.json(birthdays);
    } catch (error) {
        res.status(500).json({ message: "Error loading birthdays" });
    }
});

app.get("/api/reminders", (req, res) => {
  fs.readFile("./reminders.json", "utf8", (err, data) => {
      if (err) {
          return res.status(500).json({ message: "Error loading emails" });
      }
      const emails = JSON.parse(data);
      res.json(emails);
  });
});

// Register a new birthday
app.post("/api/birthdays", (req, res) => {
    try {
        const birthdays = JSON.parse(fs.readFileSync("./data.json"));
        const newBirthday = { id: Date.now().toString(), ...req.body };
        birthdays.push(newBirthday);
        fs.writeFileSync("./data.json", JSON.stringify(birthdays, null, 2));
        res.status(201).json(newBirthday);
    } catch (error) {
        res.status(500).json({ message: "Error adding birthday" });
    }
});

app.post("/api/reminders", (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ message: "Email is required." });
      }

      const reminders = getRemindersData();
      const birthdays = JSON.parse(fs.readFileSync("./data.json")); // Fetch all birthdays

      const existingUser = reminders.find((user) => user.email === email);

      if (existingUser) {
        existingUser.birthdays = birthdays; // Update with full birthday list
      } else {
        reminders.push({ email, birthdays });
      }

      saveRemindersData(reminders);
      res.status(201).json({ message: "Reminder successfully added with all birthdays!" });
    } catch (error) {
      res.status(500).json({ message: "Error saving data." });
    }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
