const sgMail = require("@sendgrid/mail");
const CONFIG = require("../config/index");
const logger = require("./../utils/logger");
const { EMAIL } = require("./sgTemplate");

const sendEmail = async (user, url) => {
  sgMail.setApiKey(CONFIG.SENDGRID_API_KEY);
  const msg = {
    to: user.email, // Change to your recipient
    from: CONFIG.SENDER_MAIL, // Change to your verified sender
    templateId: EMAIL,

    dynamic_template_data: {
      name: user.name,
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
