const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST, // Replace with your SMTP host
    port: process.env.SMTP_PORT,
    secure: true,
    service: process.env.SMTP_SERVICE, // Fixed typo from SMPT_SERVICE
    auth: {
      user: process.env.SMTP_MAIL, // Fixed typo from SMPT_MAIL
      pass: process.env.SMTP_PASSWORD, // Fixed typo from SMPT_PASSWORD
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