import io from 'socket.io-client';
import { MiddlewareAPI, Dispatch, Middleware, AnyAction } from 'redux';
// import debugLib from 'debug';
const debugLib = require('debug');
import config from '../config';
import { SOCKET_CONNECTED, SOCKET_DISCONNECTED, SOCKET_EMIT } from '../actions';
import { getToken } from '../utils/localStorageUtils';

const debug = debugLib('socketMiddleware');
debug.enabled = true;

export type eventName = 'customize';

const socketMiddleware = (): Middleware => {
  const token = getToken();
  const {
    socket: { url, options },
  } = config;
  const socket = io(url, {
    ...options,
    auth: {
      token,
    },
  });

  return (store: MiddlewareAPI) => {
    try {
      socket.on('connect', () => {
        store.dispatch({ type: SOCKET_CONNECTED });
      });
      socket.on('close', () => {
        store.dispatch({ type: SOCKET_DISCONNECTED });
      });
      socket.on('update', ({ type, payload }) => {
        debug(type, payload);
        store.dispatch({ type, payload });
      });
    } catch (error) {
      debug(error);
    }

    const send = (action: { type: string; payload?: string }) => {
      if (action.type === SOCKET_EMIT && action.payload) {
        try {
          debug(action.payload);
          socket.emit('data', action.payload);
        } catch (error) {
          debug(error);
        }
      }
    };

    return (next: Dispatch) => (action: AnyAction) => {
      send(action);
      next(action);
    };
  };
};

export default socketMiddleware();
