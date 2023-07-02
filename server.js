const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

app.post('/send-feedback', (req, res) => {
  const { feedback } = req.body;

  // Create a Nodemailer transporter using SMTP
  let transporter = nodemailer.createTransport({
    host: 'smtp.wpi.edu',
    port: 587,
    secure: false,
    auth: {
      user: 'your-wpi-email@wpi.edu',
      pass: 'your-wpi-email-password'
    }
  });

  // Set up email data with unicode symbols
  let mailOptions = {
    from: 'your-wpi-email@wpi.edu',
    to: 'recipient-email@domain.com', // replace with the email you want to send feedback to
    subject: 'A user has contacted you...',
    text: feedback
  };

  // Send email and handle errors
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error sending email:', err);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Feedback sent!');
    }
  });
});

app.listen(3002, () => {
  console.log('Server listening on port 3001');
});