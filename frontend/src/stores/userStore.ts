import { action } from "mobx";
import socket from "../socket";
import { Users } from "../types/types";

export type IUserStore = {
    connectedUsers: any;
    users: Users[];
    user: any;
}

export function userStore() {

    return {
        connectedUsers: [],
        users: [] as Users[],
        user: {},
        sendUsername(username: string) {
            socket.emit('setUser', { username }, action((user: Users) => {
                this.users.push(user);
            }));
        },
        getUsers() {
            socket.emit('getUsers', action((users: any) => {
                this.users = users;
            }));
        },
    }
  }
  
  export type TStore = ReturnType<typeof userStore>;