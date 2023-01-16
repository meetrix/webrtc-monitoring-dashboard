import {
  ClientType,
  ResponseType,
  SOCKET_CLIENT_JOINED,
  SOCKET_CLIENT_LEFT,
} from '@meetrix/webrtc-monitoring-common-lib';
// import debugLib from 'debug';
const debugLib = require('debug');
import { api } from '../api';
import getSocket from '../../socketService';

const debug = debugLib('services:api:clients');
const socket = getSocket();

export type Domain = string;

export const clientsApi = api.injectEndpoints({
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

export const { useListActiveClientsQuery } = clientsApi;

export default clientsApi;
