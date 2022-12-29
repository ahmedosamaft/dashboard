const mailer = require('nodemailer');

const sendEmail = async (opt) => {
  const transporter = mailer.createTransport({
    // host: process.env.EMAIL_HOST,
    // port: process.env.EMAIL_PORT,
    host: 'smtp.mailtrap.io',
    port: 25,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOp = {
    from: 'Ahmed Osama <ahmed@test.io>',
    to: opt.email,
    subject: opt.subject,
    text: opt.message,
  };
  await transporter.sendMail(mailOp);
};

module.exports = sendEmail;
