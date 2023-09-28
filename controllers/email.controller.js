const logger = require("./../utils/logge");
const OpenAI = require("openai");
const CONFIG = require("./../config/index");
const { sendEmail } = require("./../service/sendGrid");

const openai = new OpenAI({
  apiKey: CONFIG.API_KEY,
});

// Fields left optional to avoid crashes
class EmailRequest {
  constructor(
    recipient_name,
    recipient_email,
    sender_name,
    subject,
    keywords,
    length,
    send_email
  ) {
    this.recipient_name = recipient_name;
    this.recipient_email = recipient_email;
    this.sender_name = sender_name;
    this.subject = subject;
    this.keywords = keywords;
    this.length = length;
    this.send_email = send_email;
  }
}

/**
 * Login & create cookie
 * @param {Object} req
 * @param {Object} res
 */

async function generate_email(req, res) {
  const data = req.body;
  const emailRequest = new EmailRequest(
    data.recipient_name,
    data.recipient_email,
    data.sender_name,
    data.subject,
    data.keywords,
    data.length,
    data.send_email
  );

  // Generate a personalized email using ChatGPT
  const prompt = `Compose a Personalized Email to ${emailRequest.recipient_name} based on the below information. 
        - The subject ${emailRequest.subject}
        - Keywords(These are worrds you should try to integrate into the mail + take inspiration for the email): ${emailRequest.keywords}
        - Sender Name: ${emailRequest.sender_name}'`;
  try {
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: prompt,
      max_tokens: emailRequest.length,
      temperature: 0.2,
    });

    const emailContent = response.choices[0].text;
    const responseData = { emailContent: emailContent };

    if (emailRequest.send_email == true || emailRequest.send_email == "true") {
      sendEmail({
        name: emailRequest.recipient_name,
        email: emailRequest.recipient_email,
      });
    }

    res.status(200).send(responseData);
  } catch (error) {
    logger.error("Error in authenticating: " + error);
    res.status(401).send({
      message: "Error: " + error,
    });
    return;
  }
}

module.exports = {
  generate_email,
};
