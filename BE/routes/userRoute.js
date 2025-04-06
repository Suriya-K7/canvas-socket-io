const authRoute = require("express").Router();

const {
  registerUser,
  confirmUser,
  loginUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");

authRoute.post("/auth/register", registerUser);
authRoute.patch("/auth/confirm/:id", confirmUser);
authRoute.post("/auth/login", loginUser);
authRoute.put("/auth/forgotPassword", forgotPassword);
authRoute.patch("/auth/resetPassword/:resetToken", resetPassword);

module.exports = authRoute;
