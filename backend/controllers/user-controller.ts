import userModel from "../models/user-model";
import * as roomCotroller from './room-controller';

export const register = async (username: string, socket: any) => {
    try {
        const newUser = await userModel.create({ username, socket: socket.id, wins: 0 });
    
        return newUser;
    } catch (e) {
        console.log(e);
    }
};

export const getUsers = async (socket: any) => {
    try {
        socket.on('getUsers', async (callback: (users: any) => void) => {
            const users = await userModel.find();
            return callback(users);
        });
    } catch (e) {
        console.log(e);
    }
}

export const leave = async (socket: any) => {
    await userModel.deleteOne({socket: socket.id});
}