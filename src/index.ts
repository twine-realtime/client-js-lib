import { io, Socket } from "socket.io-client";

type CallbackFunction = (...args: any[]) => void;

type PayloadObj = {
	room: string;
	timestamp: number;
}

export default class TwineClientLibrary {
  socket: Socket | undefined;

  constructor(host: string) {
    this.initializeTwine(host);
  }

  async initializeTwine(host: string) {
    await fetch(`${host}/set-cookie`, { credentials: 'include' });

    this.socket = io(host, {
      withCredentials: true,
      transports: ['websocket', 'polling'],
    });

    this.socket.on('connect', async () => {
      console.log('Connected to the Twine server');
      await this.socket?.emit('stateRecovery');
    });
  }

  connect() {
    this.socket?.connect();
  }

  disconnect() {
    this.socket?.disconnect();
  }

  subscribe(roomsToJoin: string) {
    this.socket?.emit('subscribe', roomsToJoin);
    this.socket?.on("roomJoined", (msg: string) => console.log(msg))
  }

  unsubscribe(roomsToLeave: string) {
    this.socket?.emit('unsubscribe', roomsToLeave);
    this.socket?.on("roomLeft", (msg: string) => console.log(msg))
  }

  async listenOn(roomName: string, callback: CallbackFunction) {
    const id = setInterval(() => {
      if (this.socket) {
        this.socket.on("message", (payload: PayloadObj) => {
          if (payload.room === roomName) {
            callback(payload);
            this.socket?.emit("updateSessionTS", payload.timestamp);
          }
        });
        clearInterval(id);
      }
    }, 100);
  }
}