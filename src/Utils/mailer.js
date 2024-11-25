const nodemailer = require("nodemailer");
const pug = require("pug");
const path = require("path");


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendVerificationEmail = async (email, token) => {
  const url = `${process.env.BASE_URL}/?token=${token}`;

  const templatePath = path.join(__dirname, '..', 'templates', 'verification-email.pug');

  const html = pug.renderFile(templatePath, { url });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Email Verification",
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email", error);
  }
};


const sendTeacherAcceptEmail=async(email)=>{
  const templatePath = path.join(__dirname, '..', 'templates', 'accept-teacher.pug');
  const url = `${process.env.BASE_URL}`;
  const html = pug.renderFile(templatePath, { url });
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Email Verification",
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email", error);
  }
}


const sendTeacherRejectEmail=async(email)=>{
  const templatePath = path.join(__dirname, '..', 'templates', 'reject-teacher.pug');
  const html = pug.renderFile(templatePath);
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Email Verification",
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email", error);
  }
}

module.exports = { sendVerificationEmail,sendTeacherAcceptEmail,sendTeacherRejectEmail };
