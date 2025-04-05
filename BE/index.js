// required config

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { ATLAS_URI } = require("./utils/config");

app.use(express.json());
app.use(cors());

mongoose.set("strictQuery", false);

mongoose
  .connect(ATLAS_URI)
  .then(() => {
    console.log("connected to Mongo DB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.get("/", (req, res) => {
  res.send("Welcome to Canvas.io");
});

const server = app.listen(PORT, () => {
  console.log("server is running");
});
