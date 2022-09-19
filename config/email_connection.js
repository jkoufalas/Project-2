const nodemailer = require("nodemailer");
require("dotenv").config();

let emailConnection = new nodemailer.createTransport({
  service: "Outlook365", //"Outlook365" is preconfigured, but you can setup any other email client supported by nodemailer
  auth: {
    user: "group4project2@hotmail.com", //"username",
    pass: "Group!4Project!2", //"password",
  },
  //would use dotenv but cannot use .env on heroku and therefore for demo it requires this
});

module.exports = emailConnection;
