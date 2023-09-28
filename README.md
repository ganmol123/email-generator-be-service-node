# Email Generator Node.js App

This Node.js application allows you to generate personalized emails using the ChatGPT model provided by OpenAI. It also has the capability to send the generated email if desired.

## Getting Started

These instructions will help you set up and deploy the application.

### Prerequisites

Before you begin, make sure you have the following:

- [Node.js](https://nodejs.org/) installed
- [Google Cloud SDK](https://cloud.google.com/sdk) installed
- An OpenAI API key
- A Google Cloud Platform (GCP) project
- A GitHub repository for version control

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/your-username/email-generator-node-app.git
   ```

2. Change to the project directory:

   ```bash
   cd email-generator-node-app
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

4. Configure your application by creating a `config/index.js` file and adding your OpenAI API key:

   ```javascript
   module.exports = {
     API_KEY: "YOUR_OPENAI_API_KEY",
     // Add other configuration options as needed
   };
   ```

### Usage

1. Run the application locally:

   ```bash
   npm start
   ```

   This will start the server on `http://localhost:3000`.

2. Make a POST request to `http://localhost:3000/generate-email` with the following JSON payload in the request body:

   ```json
   {
     "recipient_name": "John Doe",
     "recipient_email": "johndoe@example.com",
     "sender_name": "Your Name",
     "subject": "Subject of the Email",
     "keywords": ["keyword1", "keyword2"],
     "length": 100,
     "send_email": true
   }
   ```

   Adjust the payload with your desired values.

3. The application will generate a personalized email using ChatGPT and send it if `"send_email"` is set to `true`.

### Deployment on Google App Engine

To deploy this app on Google App Engine, follow these steps:

1. Make sure you have the Google Cloud SDK installed and authenticated with your GCP account.

2. Initialize a new Google App Engine project:

   ```bash
   gcloud app create
   ```

3. Deploy the app:

   ```bash
   gcloud app deploy
   ```

4. Access your deployed app at the provided URL.

### GitHub Workflows

This project includes GitHub Actions workflows for automated testing and deployment. The workflows are defined in `.github/workflows` and can be customized to fit your needs. To set up GitHub Workflows:

1. Create a GitHub repository for your project if you haven't already.

2. Configure GitHub Secrets for sensitive information like your OpenAI API key and GCP credentials.

3. Customize the workflow files in `.github/workflows` to match your deployment process.

### Logging with Winston

This application uses Winston for logging. To configure Winston for your needs:

1. Install the Winston library:

   ```bash
   npm install winston
   ```

2. Set up Winston logging in your code. You can use different transports (e.g., file, console) and log levels based on your requirements.

3. Update the `generate_email` function to log relevant information and errors using Winston.

   ```javascript
   const winston = require("winston");

   // Example Winston configuration
   const logger = winston.createLogger({
     level: "info",
     format: winston.format.json(),
     transports: [
       new winston.transports.File({ filename: "error.log", level: "error" }),
       new winston.transports.File({ filename: "combined.log" }),
     ],
   });

   // Log an error
   logger.error("This is an error message");
   ```

## Built With

- [Node.js](https://nodejs.org/) - JavaScript runtime
- [OpenAI](https://beta.openai.com/) - ChatGPT API
- [Google App Engine](https://cloud.google.com/appengine) - Hosting platform
- [GitHub Actions](https://github.com/features/actions) - Automated workflows
- [Winston](https://github.com/winstonjs/winston) - Logging library

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspiration and guidance from the OpenAI API documentation, Google Cloud Platform resources, GitHub Actions documentation, and Winston documentation.
