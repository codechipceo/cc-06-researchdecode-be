const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendVerificationEmail = async (email, token) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Email Verification",
    text: `Please verify your email using the following link: ${process.env.BASE_URL}/verify-email?token=${token}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email", error);
  }
};

module.exports = { sendVerificationEmail };