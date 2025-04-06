const jwt = require("jsonwebtoken");
const { EMAIL_USER, EMAIL_PASS, SECRET } = require("./config");
const nodemailer = require("nodemailer");

// Generate Token
const generateToken = (user) => {
  return jwt.sign({ userId: user._id, userEmail: user.email }, SECRET, {
    expiresIn: "1d",
  });
};

//getting token

const getTokenFrom = (req) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.startsWith("bearer ")) {
    return authorization.replace("bearer ", "");
  }
};

const sendMail = async (email, message, subject) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const send = async () => {
    const info = await transporter.sendMail({
      from: `"Udhayasooriyan" <${EMAIL_PASS}>`,
      to: email,
      subject: subject,
      html: message,
    });
  };

  send();
};

module.exports = { generateToken, getTokenFrom, sendMail };
