export interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: BufferSource) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
}

export interface ClientToServerEvents {
    hello: () => void;
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    room: string;
}

export interface Username {
    username: string;
}