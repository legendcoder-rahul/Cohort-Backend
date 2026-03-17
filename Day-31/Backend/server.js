import { Server } from "socket.io";
import app from "./src/app.js";
import { createServer } from 'http'
import { log } from "console";

const httpServer = createServer(app)
const io = new Server(httpServer, { })


// io = Server
// socket = singleuse
// on = event ko listen
// emit = event ko fire karna

io.on('connection', (socket)=> {
    console.log('connected')
    socket.on('message',()=>{
        console.log('user fired message')
        io.emit()
    })
})

// socket.emit
// socket.broadcast
// io.emit

httpServer.listen(3000, ()=>{
    console.log('server is running on port 3000');
    
})