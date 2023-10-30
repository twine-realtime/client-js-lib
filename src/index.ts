import { io, Socket } from 'socket.io-client';

// const DEPLOYED_HOST = '44.212.23.240:3001';
// const LOCALHOST = 'http://localhost:3001';

type CallbackFunction = (...args: any[]) => void;

export class Twine {
	socket: Socket;
	sessionId: string;

	constructor(host: string) {
		this.socket = io(host);
		this.sessionId = localStorage.getItem('twineSessionId') || '';

		this.socket.on('connect', () => {
			this.socket.emit('sessionId', this.sessionId);
		});

		this.socket.on('setSessionId', (sessionId) => {
			console.log('client session event: ' + sessionId);
			localStorage.setItem('twineSessionId', sessionId);
		})
	}

	connect() {
		this.socket.connect();
	}

	disconnect() {
		this.socket.disconnect();
	}

	subscribe(roomsToJoin: string[]) {
		this.socket.emit('join', roomsToJoin);
		// should change the listener on the server to `subscribe`
		// should accept an array of strings instead of a single string
	}

	unsubscribe(roomsToLeave: string[]) {
		this.socket.emit('leave', roomsToLeave);
		// need to create a listener on the server to ctach this event and unsubscribe
		// param should be an array of strings
	}

	listenFor(eventName: string, callback: CallbackFunction) {
		this.socket.on(eventName, (payload) => {
			callback(payload);
		})
	}
}

const twineConnection = new Twine('http://localhost:3001');

twineConnection.disconnect();
twineConnection.connect();
twineConnection.subscribe(['A', 'B']);
twineConnection.unsubscribe(['B']);

twineConnection.listenFor('message', (payload) => {
	console.log(payload);
})