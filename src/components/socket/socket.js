import {io} from 'socket.io-client';

const SOCKET_URL = `http://13.51.89.92:5001`;

export const socket = io(SOCKET_URL);
