import { io } from 'socket.io-client';
export class Twine {
    constructor(host) {
        this.socket = io(host);
        this.sessionId = localStorage.getItem('twineSessionId') || '';
        this.socket.on('connect', () => {
            this.socket.emit('sessionId', this.sessionId);
        });
        this.socket.on('setSessionId', (sessionId) => {
            console.log('client session event: ' + sessionId);
            localStorage.setItem('twineSessionId', sessionId);
        });
    }
    connect() {
        this.socket.connect();
    }
    disconnect() {
        this.socket.disconnect();
    }
    subscribe(roomsToJoin) {
        this.socket.emit('join', roomsToJoin);
        // should change the listener on the server to `subscribe`
        // should accept an array of strings instead of a single string
    }
    unsubscribe(roomsToLeave) {
        this.socket.emit('leave', roomsToLeave);
        // need to create a listener on the server to ctach this event and unsubscribe
        // param should be an array of strings
    }
    listenFor(eventName, callback) {
        this.socket.on(eventName, (payload) => {
            callback(payload);
        });
    }
}
const twineConnection = new Twine('http://localhost:3001');
twineConnection.disconnect();
twineConnection.connect();
twineConnection.subscribe(['A', 'B']);
twineConnection.unsubscribe(['B']);
twineConnection.listenFor('message', (payload) => {
    console.log(payload);
});
