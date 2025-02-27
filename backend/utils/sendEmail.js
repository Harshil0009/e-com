// const nodeMailer = require("nodemailer");

// const sendEmail = async (options) => {
//   const transporter = nodeMailer.createTransport({
//     service: process.env.SMTP_SERVICE, // Fixed typo from SMPT_SERVICE
//     auth: {
//       user: process.env.SMTP_MAIL, // Fixed typo from SMPT_MAIL
//       pass: process.env.SMTP_PASSWORD, // Fixed typo from SMPT_PASSWORD
//     },
//   });

//   const mailOptions = {
//     from: process.env.SMTP_MAIL,
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//   };

//   await transporter.sendMail(mailOptions);
// };

// module.exports = sendEmail;

const nodemailer = require("nodemailer");

console.log("SMTP Mail:", process.env.SMTP_MAIL); // Debugging
console.log("SMTP Password:", process.env.SMTP_PASSWORD); // Debugging

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === "true", // Convert string to boolean
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;