var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { io } from "socket.io-client";
export class Twine {
    constructor(host) {
        this.initializeTwine(host);
    }
    initializeTwine(host) {
        return __awaiter(this, void 0, void 0, function* () {
            yield fetch(`${host}/set-cookie`, { credentials: 'include' });
            this.socket = io(host, {
                withCredentials: true,
                transports: ['websocket'],
            });
            this.socket.on('connect', () => __awaiter(this, void 0, void 0, function* () {
                var _a;
                console.log('Connected to the Twine server');
                yield ((_a = this.socket) === null || _a === void 0 ? void 0 : _a.emit('stateRecovery'));
            }));
        });
    }
    connect() {
        var _a;
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.connect();
    }
    disconnect() {
        var _a;
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.disconnect();
    }
    subscribe(roomsToJoin) {
        var _a, _b;
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.emit('subscribe', roomsToJoin);
        (_b = this.socket) === null || _b === void 0 ? void 0 : _b.on("roomJoined", (msg) => console.log(msg));
    }
    unsubscribe(roomsToLeave) {
        var _a, _b;
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.emit('unsubscribe', roomsToLeave);
        (_b = this.socket) === null || _b === void 0 ? void 0 : _b.on("roomLeft", (msg) => console.log(msg));
    }
    listenOn(roomName, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = setInterval(() => {
                if (this.socket) {
                    this.socket.on("message", (payload) => {
                        var _a;
                        if (payload.room === roomName) {
                            callback(payload);
                            (_a = this.socket) === null || _a === void 0 ? void 0 : _a.emit("updateSessionTS", payload.timestamp);
                        }
                    });
                    clearInterval(id);
                }
            }, 100);
        });
    }
}
