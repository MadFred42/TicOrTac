import 'dotenv/config';
import express from 'express';
import * as http from 'http';
import * as socket from 'socket.io';
import * as userController from './controllers/user-controller';
import mongoose from 'mongoose';
import { Username } from './types/types';

const app = express();
const server = http.createServer(app);
const io = new socket.Server(server);
const PORT = process.env.PORT || 5000;
let connectedUsers: any = [];

io.on('connection', async (socket) => {
    console.log(`User ${socket.id} connected`);
    const room = 'room';
    socket.data.room = room;
    socket.join(room);

    socket.on('end', () => {
        connectedUsers.splice(connectedUsers.indexOf(socket), 1);
    });

    socket.on('setUser', async ({ username }: Username, callback: (user: any) => void) => {
        try {
            const user = await userController.register(username, socket);
            connectedUsers.push(socket);
            
            callback(user);

            for (let i in connectedUsers) {
                connectedUsers[i].emit('updateUsers', /* messages object */);
            }
        } catch (e) {
            console.log(e);
        }
    });

    socket.on('makeAMove', (data: any) => {
        for (let i in connectedUsers) {
            if (connectedUsers[i].id !== socket.id) {
                connectedUsers[i].emit('getAMove', { move: data.ticOrTac, square: data.square });
            }
        }
    });

    userController.getUsers(socket);
    
    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`);
        connectedUsers.splice(connectedUsers.indexOf(socket), 1);
        userController.leave(socket);
    });
});

const start = () => {
    try {
        mongoose.connect(`${process.env.DB_URL}`);
        server.listen(PORT, () => console.log(`Server is running on ${PORT} port`));
    } catch (e) {
        console.log(e);
    }
}

start();