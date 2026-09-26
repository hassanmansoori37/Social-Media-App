import nodemailer from 'nodemailer';

export const sendEmail = async(email, subject, text) => {
    try {
        // Create the transporter object
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // false for port 587, true for port 465
  auth: {
    user: 'mansoorihassan409@gmail.com',
    pass: process.env.NODEMAILER_PASSWORD
  }
});

// Configure mail options
const mailOptions = {
  from: 'mansoorihassan409@gmail.com',
  to: email,
  subject: subject,
  text: text
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Error:', error);
  }
  console.log('Email sent:', info.response);
});

        
    } catch (error) {
        console.log(error);
        
        
    }
}

