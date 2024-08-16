// // import express from 'express';
// // import bodyParser from 'body-parser';
// // import cors from 'cors';
// // import './config.js'
// // import nodemailer from 'nodemailer';

// // const app = express();
// // const port = process.env.PORT

// // console.log(process.env.EMAIL)

// // app.use(bodyParser.urlencoded({ extended: true }))
// // app.use(bodyParser.json())
// // app.use(cors())

// // const transporter = nodemailer.createTransport({
// //     service: 'gmail',
// //     auth: {
// //         user: "smarttechnology156@gmail.com",
// //         pass: "Victory1122@"
// //     }
// // })

// // app.post("/", (req, res) => {
// //     const { firstName, lastName, phoneNumber, email, message } = req.body;

// //     const mailOptions = {
// //         from: email,
// //         to: process.env.EMAIL,
// //         subject: 'New Message From Your Portfolio Site',
// //         text: `Name: ${firstName} ${lastName}\nPhone Number: ${phoneNumber}\nEmail: ${email}\nMessage: ${message}`
// //     }

// //     transporter.sendMail(mailOptions, (error, info) => {
// //         if (error) {
// //            return res.status(500).send(error.toString());
// //         } else {
// //             res.status(200).send('Email sent:'+ info.response)
// //         }
// //         console.log(mailOptions)
// //     })
// // })

// // app.listen(port, () => {
// //     console.log(`Server running on port ${port}`)
// // })

// import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import nodemailer from 'nodemailer';

// // Load environment variables from .env file
// dotenv.config();

// const app = express();
// const port = process.env.PORT; // Default to port 3000 if not specified

// // Middleware to parse JSON and URL-encoded bodies
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL, // Use environment variable for email
//         pass: process.env.EMAIL_PASSWORD // Use environment variable for email password
//     }
// });

// app.post("/", (req, res) => {
//     const { firstName, lastName, phoneNumber, email, message } = req.body;

//     const mailOptions = {
//         from: email,
//         to: process.env.EMAIL,
//         subject: 'New Message From Your Portfolio Site',
//         text: `Name: ${firstName} ${lastName}\nPhone Number: ${phoneNumber}\nEmail: ${email}\nMessage: ${message}`
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return res.status(500).send(error.toString());
//         } else {
//             res.status(200).send('Email sent: ' + info.response);
//         }
//         console.log(mailOptions);
//     });
// });

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // Default to port 3000 if not specified

// Middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // Use environment variable for email
    pass: process.env.EMAIL_PASS, // Use environment variable for email password (App Password)
  },
});

// Test transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("Error with email configuration:", error);
  } else {
    console.log("Email configuration is correct");
  }
});

app.post("/sendForm", (req, res) => {
  const { firstName, lastName, phoneNumber, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.EMAIL,
    subject: "New Message From Your Portfolio Site",
    text: `Name: ${firstName} ${lastName}\nPhone Number: ${phoneNumber}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).send(error.toString());
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send("Email sent: " + info.response);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
