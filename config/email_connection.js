const nodemailer = require("nodemailer");
require("dotenv").config();

let emailConnection = new nodemailer.createTransport({
  let emailConnection = new nodemailer.createTransport({
    host: process.env.EMAIL_HOST, //smpt address
    port: process.env.EMAIL_PORT, // email port
    secure: process.env.EMAIL_SECURE, // SSL
    auth: {
      user: process.env.EMAIL_USER, //"username",
      pass: process.env.EMAIL_PASSWORD, //"password",
    },
  });
});

module.exports = emailConnection;
