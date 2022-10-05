const path=require('path');
const http=require('http');
const express=require('express');
const socketio=require('socket.io');
const formatMessage = require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');


const app=express();
const server=http.createServer(app)
const io=socketio(server)


app.use(express.static(path.join(__dirname,'public')));

const botName="Pragati bot"
//run when client connects
io.on('connection',socket=>{

    socket.on('joinRoom',({username,room})=>{
        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

        socket.emit('message', formatMessage(botName, 'Welcome to Chat!'));

        // Broadcast when a user connects
        socket.broadcast
        .to(user.room)
        .emit(
            'message',
            formatMessage(botName, `${user.username} has joined the chat`)
        );

        // Send users and room info
        io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
        });

    })

    socket.on('chatMessage',(msg)=>{
        const user = getCurrentUser(socket.id);

    io.emit('message', msg);
    })


    //msg when user connect
    // socket.broadcast.emit('message','A user has joined');
    socket.on('disconnect',()=>{
        const user = userLeave(socket.id);

        if (user) {
        io.to(user.room).emit(
            'message',
            formatMessage(botName, `${user.username} has left the chat`)
        );

        // Send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
        }
    });

});


const PORT=9000||process.env.PORT;

server.listen(PORT,()=>{
    console.log(`server started at ${PORT}`)
})