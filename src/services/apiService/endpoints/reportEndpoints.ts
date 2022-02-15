import {
  Report,
  SOCKET_CONNECTION_INFO,
  SOCKET_OTHER_INFO,
  SOCKET_REPORT_STATS,
  SOCKET_ROOM_JOIN,
} from '@meetrix/webrtc-monitoring-common-lib';
import { TimelineEvent } from '@peermetrics/webrtc-stats';
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
            draft.tag = report.tag;
            draft.peerId = report.peerId;
            draft.data = report.data;
            draft.timestamp = report.timestamp;
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

    getConnectionInfo: build.query<TimelineEvent, Options>({
      query: ({ domain, clientId }) => `report/${domain}/${clientId}`,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const onConnectionInfo = (connectionInfo: TimelineEvent) => {
          updateCachedData((draft) => {
            draft.event = connectionInfo.event;
            draft.tag = connectionInfo.tag;
            draft.peerId = connectionInfo.peerId;
            draft.data = connectionInfo.data;
            draft.timestamp = connectionInfo.timestamp;
          });
        };

        try {
          await cacheDataLoaded;
          socket.on(SOCKET_CONNECTION_INFO, onConnectionInfo);
        } catch (e) {
          debug('Error', e);
        }
        await cacheEntryRemoved;
        socket.off(SOCKET_CONNECTION_INFO, onConnectionInfo);
      },
    }),

    getOtherInfo: build.query<TimelineEvent, Options>({
      query: ({ domain, clientId }) => `report/${domain}/${clientId}`,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const onOtherInfo = (otherInfo: TimelineEvent) => {
          updateCachedData((draft) => {
            draft.event = otherInfo.event;
            draft.tag = otherInfo.tag;
            draft.peerId = otherInfo.peerId;
            draft.data = otherInfo.data;
            draft.timestamp = otherInfo.timestamp;
          });
        };

        try {
          await cacheDataLoaded;
          socket.on(SOCKET_OTHER_INFO, onOtherInfo);
        } catch (e) {
          debug('Error', e);
        }
        await cacheEntryRemoved;
        socket.off(SOCKET_OTHER_INFO, onOtherInfo);
      },
    }),
  }),
});

export const { useGetReportQuery } = clientsApi;
export const { useGetConnectionInfoQuery } = clientsApi;
export const { useGetOtherInfoQuery } = clientsApi;

export default clientsApi;
