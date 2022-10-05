const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

// io.on("connection",(socket)=>{

// });
io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("chat", (payload) => {
    io.emit("chat", payload);
  });
  socket.on("draw/command", (commands) => {
    console.log(commands);
    socket.broadcast.emit("draw/command", commands);
  });
  socket.on("draw/command", (commands) => {
    // console.log(command, startX, startY, currentX, currentY);
    // console.log(batch);
    socket.broadcast.emit("draw/command", commands);
  });

  socket.on("send-message", (message, room) => {
    if (room === "") {
      socket.broadcast.emit("receive-message", message);
    } else {
      socket.to(room).emit("receive-message", message);
    }
  });
});
server.listen(5000, () => {
  console.log(`server is running on ${5000}`);
});
