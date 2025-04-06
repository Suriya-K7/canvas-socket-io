require("dotenv").config();

const ATLAS_URI = process.env.ATLAS_URI;
const PORT = process.env.PORT;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const SECRET = process.env.SECRET;
const BEURL = process.env.BEURL;
const FEURL = process.env.FEURL;

module.exports = {
  ATLAS_URI,
  PORT,
  EMAIL_USER,
  EMAIL_PASS,
  SECRET,
  FEURL,
  BEURL,
};
