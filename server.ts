import express, { Request, Response } from 'express';
import { Server as SocketIO } from 'socket.io'
import http from 'http';

const app = express();
const server = http.createServer(app);
const port = 3000;

const io = new SocketIO(server);


io.on('connection', socket => {
    console.log("client Connected")

});

server.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
});
