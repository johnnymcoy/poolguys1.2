import nodemailer from 'nodemailer';
import config from "@/api/config/config.json";

const { email } = config.contact;
const { title } = config.site;

const sendEmail = async (req, res) => {
  if (req.method === 'POST') {
    const { name, email : customerEmail, message } = req.body;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Define the email content
    const mailOptions = {
        from: email,
        to: email,
        subject: `[${title}] New Message From ${name}`,
        text: 
`New Message sent from Contact page [${title}]
Message sent from: ${name}, Email: ${customerEmail}
Message: ${message}`,};

    try {
      // Attempt to send the email
      await transporter.sendMail(mailOptions);
      res.status(200).send('Message sent successfully.');
    } catch (error) {
      console.log('ERROR', error);
      res.status(400).send('Message not sent.');
    }
  } else {
    res.status(404).send('Invalid request method.');
  }
};

export default sendEmail;
