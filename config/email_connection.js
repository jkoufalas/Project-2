const nodemailer = require("nodemailer");
require("dotenv").config();

let emailConnection = new nodemailer.createTransport({
  service: "Outlook365", //"gmail" is preconfigured by nodemailer, but you can setup any other email client supported by nodemailer
  auth: {
    user: process.env.EMAIL_USER, //"username",
    pass: process.env.EMAIL_PASSWORD, //"password",
  },

  /*  host: process.env.EMAIL_HOST, //smpt address
  port: process.env.EMAIL_PORT, // email port
  secure: process.env.EMAIL_SECURE, // SSL
  auth: {
    user: process.env.EMAIL_USER, //"username",
    pass: process.env.EMAIL_PASSWORD, //"password",
  },
  tls: {
    ciphers: "SSLv3",
  }, */
});

module.exports = emailConnection;
