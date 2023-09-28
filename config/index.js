require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  API_KEY: process.env.API_KEY,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  SENDER_MAIL: process.env.SENDER_MAIL,
};
