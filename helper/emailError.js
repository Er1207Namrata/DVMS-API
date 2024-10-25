
import nodemailer from 'nodemailer'
import  db from '../config/db.js'

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user:  process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD

  }
});

const sendErrorEmail = (error) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: 'swati@thesileo.com',
    subject: 'Error in DVMS API',
    text: `An error occurred: ${error.message}\n\nStack Trace:\n${error.stack}`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error sending email:', err);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

export default sendErrorEmail;
