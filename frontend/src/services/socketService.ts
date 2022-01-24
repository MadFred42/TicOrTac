import socket from "../socket";

export const sendUsername = (username: string) => {
    socket.emit('setUser', { username });
};