const nodemailer = require("nodemailer");
require("dotenv").config();

let emailConnection = new nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE, // upgrade later with STARTTLS
  auth: {
    user: process.env.EMAIL_USER, //"username",
    pass: process.env.EMAIL_PASSWORD, //"password",
  },
});

module.exports = emailConnection;

/* nodemailer.createTransport({
  host: "smtp.example.com",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: "username",
    pass: "password",
  },
}); */
