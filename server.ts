import express, { Request, Response } from 'express';
import { Server as SocketIO } from 'socket.io'
import http from 'http';

const app = express();
const server = http.createServer(app);
const port = 3000;

const io = new SocketIO(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});


// Configurar eventos de Socket.IO

io.on('connection', (socket) => {
    io.emit('userConnected', socket.id);

    console.log('A user connected: ', socket.id);

    // Notificar a todos cuando un cliente está escribiendo
    socket.on('typing', (clientId) => {
        socket.broadcast.emit('typing', clientId);
    });

    // Notificar a todos cuando un cliente deja de escribir
    socket.on('stopTyping', (clientId) => {
        socket.broadcast.emit('stopTyping', clientId);
    });

    // Manejar el envío de mensajes
    socket.on('message', (data) => {
        io.emit('message', data);
    });

    // Cuando un cliente se desconecta
    socket.on('disconnect', () => {
        console.log('User disconnected: ', socket.id);
        io.emit('userDisconnected', socket.id);
    });
});
app.get('/', (_req: Request, res: Response) => {
    res.send('Hello World!');
});

server.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
});
