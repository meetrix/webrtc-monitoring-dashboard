import io, { Socket } from 'socket.io-client';
import { getToken } from '../utils/localStorageUtils';
import config from '../config';

let socket: Socket;

const getSocket = (): Socket => {
  if (!socket) {
    const token = getToken();
    const {
      socket: { url, options },
    } = config;
    socket = io(url, {
      ...options,
      auth: {
        token,
      },
    });
  }
  return socket;
};

export default getSocket;
