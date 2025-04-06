require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");

const { ATLAS_URI, PORT } = require("./utils/config");

const userRoute = require("./routes/userRoute");

const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(cors());
app.use(userRoute);

// MongoDB setup (optional)
mongoose.set("strictQuery", false);

mongoose
  .connect(ATLAS_URI)
  .then(() => {
    console.log("connected to Mongo DB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("canvas-data", (data) => {
    socket.broadcast.emit("canvas-data", data);
  });

  socket.on("loggeduser", (username) => {
    io.emit("loggeduser", username);
  });
  socket.on("disconnect", () => {
    if (socket.username) {
      io.emit("userleft", socket.username);
    }
    console.log("user disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("Welcome to Canvas.io");
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
