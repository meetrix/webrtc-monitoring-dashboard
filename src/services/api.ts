import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  SOCKET_CLIENT_JOINED,
  SOCKET_CLIENT_LEFT,
  SOCKET_ROOM_JOIN,
  ClientType,
  ResponseType,
} from '@meetrix/webrtc-monitoring-common-lib';
import debugLib from 'debug';
import getSocket from './socketService';
import { getToken } from '../utils/localStorageUtils';
import config from '../config';
import { getUrlParams } from '../utils/urlUtils';

const debug = debugLib('services:api');

export type Domain = string;

const socket = getSocket();
const { clientId } = getUrlParams();

if (clientId) {
  socket.emit(SOCKET_ROOM_JOIN, { room: clientId });
}

// Refer to: https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery
const baseQuery = fetchBaseQuery({
  baseUrl: config.api.baseURL,
  prepareHeaders: (headers) => {
    headers.set('authorization', `Bearer ${getToken()}`);
    return headers;
  },
});

// Refer to : https://redux-toolkit.js.org/rtk-query/usage/streaming-updates
export const api = createApi({
  baseQuery,
  endpoints: (build) => ({
    listActiveClients: build.query<ResponseType<ClientType[]>, Domain>({
      query: (domain) => `clients/${domain}`,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const onClientJoinedListener = (client: ClientType) => {
          if (!client.clientId) return;

          updateCachedData((draft) => {
            draft?.data?.push(client);
          });
        };

        const onClientLeftListener = (client: ClientType) => {
          if (!client.clientId) return;

          updateCachedData((draft: any) => {
            draft.data = draft?.data?.filter(
              (_client: ClientType) => _client.clientId !== client.clientId
            );
          });
        };
        try {
          await cacheDataLoaded;
          socket.on(SOCKET_CLIENT_JOINED, onClientJoinedListener);
          socket.on(SOCKET_CLIENT_LEFT, onClientLeftListener);
        } catch (e) {
          debug('Error', e);
        }
        await cacheEntryRemoved;
        socket.off(SOCKET_CLIENT_JOINED, onClientJoinedListener);
        socket.off(SOCKET_CLIENT_LEFT, onClientLeftListener);
      },
    }),
  }),
});

export const { useListActiveClientsQuery } = api;
