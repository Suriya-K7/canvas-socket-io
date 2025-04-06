# 🎨 Real-Time Collaborative Drawing Tool

This is a **full-stack real-time drawing application** where users can log in, draw on a canvas, and collaborate in real-time. It uses **Socket.IO** for live communication, and **HTML Canvas** for drawing features. Styling is handled with **Tailwind CSS** and **Mud Components**.

---

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, Mud Components
- **Backend**: Node.js, Express
- **WebSocket**: Socket.IO
- **Database**: MongoDB
- **API Calls**: Axios
- **Drawing Tool**: HTML Canvas

---

## 🚀 Live Demo

- **Frontend (Netlify)**: [Live Link](https://canvas-socket.netlify.app/)
- **Backend (Render)**: [Live Link](https://canvas-socket-io.onrender.com)

---

## 📦 Project Setup

Clone the project repository to your local environment:

```bash
git clone https://github.com/Suriya-K7/canvas-socket-io.git
```

---

### 🔧 Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd FE
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

✅ The frontend should now be running locally.  
⚠️ Make sure you have the proper environment set up (Node.js, npm, etc.).

---

### 🔧 Backend Setup

1. Open a **new terminal** and navigate to the backend directory:

   ```bash
   cd BE
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the backend server:

   ```bash
   npm run dev
   ```

✅ The backend should now be running locally.  
⚠️ Ensure MongoDB is running and proper `.env` configuration is provided.

---

## 📝 Project Features

- 🔐 **Login System**: Users can log in using demo credentials.
- 🎨 **Canvas Drawing**: Users can draw using different brush sizes and colors.
- 🔄 **Real-Time Sync**: All drawing updates are synchronized live using Socket.IO.
- 🧑‍🤝‍🧑 **User Presence**: When a user logs in or logs out, all connected users receive a notification in real time.
