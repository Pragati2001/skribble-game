const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { v4: uuid4 } = require("uuid");

const app = express();
const bcrypt = require("bcrypt");
app.use(cors());
app.use(express.json());
const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://admin.socket.io",
      "http://127.0.0.1:5500",
    ],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected : ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`user with id ${socket.id} with room ${data}`);
  });

  // socket.on("send_message", (data) => {
  //   console.log(data);
  //   socket.to(data.room).emit("receive_message", data);
  // });
  socket.on("send_message", (message) => {
    console.log(message);
    socket.emit(message.message);
    // if (room === "") {
    //   socket.broadcast.emit("receive-message", message);
    // } else {
    //   socket.to(room).emit("receive-message", message);
    // }
  });

  socket.on("disconnect", () => {
    console.log("user disconnect", socket.id);
  });

  socket.on("join-room", (name, roomId, callback) => {
    callback("joined room");
  });

  socket.on("draw/command", (commands) => {
    // console.log(command, startX, startY, currentX, currentY);
    // console.log(batch);
    socket.broadcast.emit("draw/command", commands);
  });

  socket.on("send-message", (message) => {
    socket.broadcast.emit("send-message", message);
  });
  socket.on("receive_message", (message) => {
    socket.broadcast.emit("receive-message", message);
  });
});

// app.post("/signup", async (req, res) => {
//   try {
//     const userId = uuid4();
//     const hashedpassword = await bcrypt.hash(password, 10);
//     const token = serverClient.createToken(userId);
//     res.json({ token, userId, hashedpassword });
//   } catch (error) {
//     res.json(error);
//   }
// });
// const api_key = "";
// const api_secret = "";
//getstream app
server.listen(3001, () => {
  console.log("posrt 3001 runnig");
});
