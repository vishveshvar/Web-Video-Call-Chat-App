const app = require("express")();
const server =require("http").createServer(app);
const cors = require("cors");
const { METHODS } = require("http");
const { sourceMapsEnabled } = require("process");
const { Socket } = require("socket.io");

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        METHODS:["GET","POST"]
    }
});

app.use(cors());

const PORT = process.env.PORT || 5000;
app.get ("/", (req, res) => {
    res.send('Server is running');
});
io.on('connection', (Socket) =>{
     Socket.emit('me', Socket.id);

     Socket.on('disconnect', () =>{
        Socket.broadcast.emit("callended");
     });

     Socket.on("calluser", ({userToCall, signalData, from, name }) =>{
        io.to(userToCall).emit("calluser", { signal: signalData,from, name});

     });
     Socket.on("answercall", (data) =>{
        io.to(data.to).emit("callaccepted", data.signal);
     });
});

server.listen(PORT, () => console.log('Server listening on port ${PORT}'));