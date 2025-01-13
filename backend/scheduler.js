import cron from "node-cron";
import fs from "fs";
import nodemailer from "nodemailer";
import moment from "moment";

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "b27628591@gmail.com",
        pass: "tidr zjcn peon xesp"  
    }
});


const getCurrentWeekRange = () => {
    const startOfWeek = moment().startOf('week').startOf('day');
    const endOfWeek = moment().endOf('week').endOf('day');
    return { startOfWeek, endOfWeek };
};


const isBirthdayThisWeek = (birthday) => {
    const { startOfWeek, endOfWeek } = getCurrentWeekRange();
    const birthdayDate = moment(birthday.date, "YYYY-MM-DD");
    return birthdayDate.isBetween(startOfWeek, endOfWeek, null, "[]"); 
};

const sendWeeklyReminders = async () => {
    try {
        const reminderData = JSON.parse(fs.readFileSync("./reminders.json"));

        for (const user of reminderData) {

            const birthdaysThisWeek = user.birthdays
                .filter(isBirthdayThisWeek)
                .map(b => {
                    const formattedDate = moment(b.date, "YYYY-MM-DD").format("MM-DD");
                    return { name: b.name, date: formattedDate };
                });


            if (birthdaysThisWeek.length === 0) {
                console.log(`No birthdays this week for ${user.email}`);
                continue;
            }

            birthdaysThisWeek.sort((a, b) => moment(a.date, "MM-DD").isBefore(moment(b.date, "MM-DD")) ? -1 : 1);


            const birthdayList = birthdaysThisWeek
                .map(b => `🎉 ${b.name} on ${b.date}`)
                .join("\n");

            const mailOptions = {
                from: '"Birthday Reminder" <b27628591@gmail.com>',
                to: user.email,
                subject: "Upcoming Birthdays!",
                text: `🎉 Upcoming birthdays this week:\n\n${birthdayList}`
            };

            await transporter.sendMail(mailOptions);
            console.log(`Email successfully sent to: ${user.email}`);
        }
    } catch (error) {
        console.error("Error sending reminders:", error);
    }
};

// Esmaspaev kell 8
cron.schedule("0 8 * * MON", sendWeeklyReminders); 
