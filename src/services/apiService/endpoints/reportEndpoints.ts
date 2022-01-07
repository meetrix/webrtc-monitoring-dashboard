import {
  Report,
  SOCKET_REPORT_STATS,
  SOCKET_ROOM_JOIN,
} from '@meetrix/webrtc-monitoring-common-lib';
import debugLib from 'debug';
import { getUrlParams } from '../../../utils/urlUtils';
import getSocket from '../../socketService';
import { api } from '../api';

const debug = debugLib('services:api:clients');
const socket = getSocket();
const { clientId: _clientId, mockStats } = getUrlParams();

export type Options = {
  domain: string;
  clientId: string;
};

if (_clientId) {
  socket.emit(SOCKET_ROOM_JOIN, { room: _clientId });
}

export const clientsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getReport: build.query<Report, Options>({
      query: ({ domain, clientId }) => `report/${domain}/${clientId}`,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const onStats = (report: Report) => {
          updateCachedData((draft) => {
            draft.event = report.event;
            draft.data = report.data;
          });
        };

        try {
          await cacheDataLoaded;
          socket.on(SOCKET_REPORT_STATS, onStats);
        } catch (e) {
          debug('Error', e);
        }
        await cacheEntryRemoved;
        socket.off(SOCKET_REPORT_STATS, onStats);
      },
    }),
  }),
});

export const { useGetReportQuery } = clientsApi;

export default clientsApi;
