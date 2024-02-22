//creating server
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer((req,res)=>{
    if (req.url !== '/') {
        res.writeHead(404);
        res.end('Not found');
        return;
    }

    res.writeHead(200, {
        'Content-Type': 'text',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, GET',
    });
    res.end();
});

//socket server
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        },
});

//socket work
io.on("connection", (socket) => {

    let users = {}

    socket.on('new-user-joined',(name)=>{
        users[socket.id] =name;
        socket.broadcast.emit('user-joined',name);
    })

    socket.on('send',data=>{
        socket.broadcast.emit('recieve',{message:data.msg,name:data.user});
    })

    socket.on('disconnect',name=>{
        socket.broadcast.emit('leave',users[socket.id]);
        delete users[socket.id];
    })
});

//listening to server
httpServer.listen(process.env.PORT || 8000);
