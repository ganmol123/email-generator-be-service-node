const sgMail = require("@sendgrid/mail");
const CONFIG = require("../config/index");
const logger = require("./../utils/logger");
const { EMAIL } = require("./sgTemplate");

const sendEmail = async (user_email, prompt) => {
  sgMail.setApiKey(CONFIG.SENDGRID_API_KEY);
  const msg = {
    to: user_email, // Change to your recipient
    from: CONFIG.SENDER_MAIL, // Change to your verified sender
    templateId: EMAIL,

    dynamic_template_data: {
      email: prompt,
    },
    hideWarnings: true, // now the warning won't be logged
  };
  sgMail
    .send(msg)
    .then(() => {
      logger.info("Email sent");
    })
    .catch((error) => {
      logger.error(error);
      return Promise.reject("Email not sent!");
    });
};

module.exports = { sendEmail };
