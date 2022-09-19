const nodemailer = require("nodemailer");
require("dotenv").config();

let emailConnection = new nodemailer.createTransport({
  host: process.env.EMAIL_HOST, //smpt address
  port: process.env.EMAIL_PORT, // email port
  secure: process.env.EMAIL_SECURE, // SSL
  auth: {
    user: process.env.EMAIL_USER, //"username",
    pass: process.env.EMAIL_PASSWORD, //"password",
  },
});

emailConnection.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

module.exports = emailConnection;
