const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const { FRONTEND_URL } = require("../utils/config");

const { generateToken, sendMail } = require("../utils/helper");

//register new user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //validation
    if (!name || !email || !password)
      return res.status(400).json({ message: "all fields are mandotary" });

    const userExists = await User.findOne({ email });

    if (userExists)
      return res.status(400).json({ message: "user already exists" });

    //generating random string for confirming user
    const randomString =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    const link = `${FRONTEND_URL}/confirm/${randomString}`;

    const user = await User.create({
      name,
      email,
      password,
      verifyToken: randomString,
    });

    const message = `
    <h2>Hello ${name}</h2>
    <p>Please use the url below to Activate your account</p>  

    <a href=${link} target="_blank">${link}</a>

    <p>Regards...</p>
    <p>App Team</p>
  `;

    //send account verification email to user email
    await sendMail(user.email, message, "Confirm account");

    //sending response to front end

    res.status(201).json({
      message: `${user.name} Account has been Created, Please Check your Email and Activate Your Account`,
    });
    //
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// confirm new user
const confirmUser = async (req, res) => {
  try {
    //getting data from frontend using ID params
    const verifyToken = req.params.id;

    const matchedUser = await User.findOne({ verifyToken });

    //if user not found throw error

    if (matchedUser === null || matchedUser.verifyToken === "") {
      return res.status(400).json({
        message: "Account Already activated, Please proceed for login",
      });
    }

    //confirming and updating account
    matchedUser.isVerified = true;

    matchedUser.verifyToken = "";

    await User.findByIdAndUpdate(matchedUser._id, matchedUser);

    //sending data to FE
    res.status(201).json({
      message: `${matchedUser.name} account has been verified successfully, Please Proceed to Login`,
    });

    //
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }

    // Find user
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found, please sign up" });
    }

    // Check password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Check verification
    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify your account" });
    }

    // Generate token
    const token = generateToken(user);

    // Remove password before sending response
    const { password: _, ...userData } = user.toObject();

    res.status(200).json({ token, user: userData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//forgot password
const forgotPassword = async (req, res) => {
  try {
    //getting data from FE

    const { email } = req.body;

    //getting matched user from database

    const user = await User.findOne({ email });

    //throw error if user not found
    if (!user) {
      res.status(400).json({ message: "User not exists" });
      return;
    }

    // Delete token if it exists in DB
    let token = await Token.findOne({ userId: user._id });

    if (token) await token.deleteOne();

    // Create Reset Token
    let resetToken = crypto.randomBytes(32).toString("hex") + user._id;

    // Hash token before saving to DB
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Save Token to DB
    await new Token({
      userId: user._id,
      token: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 30 * (60 * 1000), // Thirty minutes
    }).save();

    // Construct Reset Url
    const resetUrl = `${FRONTEND_URL}/reset/${resetToken}`;

    // Reset Email
    const message = `
        <h2>Hello ${user.name}</h2>
        <p>Please use the url below to reset your password</p>  
        <p>This reset link is valid for only 30minutes.</p>
  
        <a href=${resetUrl} target="_blank">${resetUrl}</a>
  
        <p>Regards...</p>
        <p>App Team</p>
      `;
    const subject = "Password Reset Request";

    await sendMail(email, message, subject);

    //sending response to frontend
    return res
      .status(201)
      .json({ message: `Mail has been send to ${user.email}` });
    //
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  try {
    //getting data & resdettoken from frontend

    const { password } = req.body;

    const { resetToken } = req.params;

    // Hash token, then compare to Token in DB
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // fIND tOKEN in DB
    const userToken = await Token.findOne({
      token: hashedToken,
      expiresAt: { $gt: Date.now() },
    });

    if (!userToken) {
      res.status(400).json({ message: "Link Expired, Please try again" });
      return;
    }

    // Find user and update password
    const user = await User.findOne({ _id: userToken.userId });

    user.password = password;

    await user.save();

    await userToken.deleteOne();

    //sending response data to FE

    res.status(200).json({
      message: "Password updated Successfully, Please Login",
    });
    //
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  confirmUser,
  loginUser,
  forgotPassword,
  resetPassword,
};
