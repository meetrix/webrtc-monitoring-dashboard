import {
  Report,
  SOCKET_CONNECTION_INFO,
  SOCKET_OTHER_INFO,
  SOCKET_REPORT_STATS,
  SOCKET_ROOM_JOIN,
} from '@meetrix/webrtc-monitoring-common-lib';
import { TimelineEvent } from '@peermetrics/webrtc-stats';
// import debugLib from 'debug';
const debugLib = require('debug');
import { getUrlParams } from '../../../utils/urlUtils';
import getSocket from '../../socketService';
import { api } from '../api';

const debug = debugLib('services:api:clients');
const socket = getSocket();
const { clientId: _clientId } = getUrlParams();

export type Options = {
  domain: string;
  clientId: string;
};

if (_clientId) {
  socket.emit(SOCKET_ROOM_JOIN, { room: _clientId });
}

const onUpdateCachedData = (event: TimelineEvent, draft: any) => {
  draft.peerId = event.peerId;
  draft.event = event.event;
  draft.tag = event.tag;
  draft.data = event.data;
  draft.timestamp = event.timestamp;
};

const onCacheEntryAddedBody = async (
  event: string,
  updateCachedData: any,
  cacheDataLoaded: any,
  cacheEntryRemoved: any
) => {
  const onStats = (report: Report) => {
    updateCachedData((draft: any) => {
      onUpdateCachedData(report, draft);
    });
  };

  try {
    await cacheDataLoaded;
    socket.on(event, onStats);
  } catch (e) {
    debug('Error', e);
  }
  await cacheEntryRemoved;
  socket.off(event, onStats);
};

export const clientsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getReport: build.query<Report, Options>({
      query: ({ domain, clientId }) => `report/${domain}/${clientId}`,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        onCacheEntryAddedBody(
          SOCKET_REPORT_STATS,
          updateCachedData,
          cacheDataLoaded,
          cacheEntryRemoved
        );
      },
    }),

    getConnectionInfo: build.query<TimelineEvent, Options>({
      query: ({ domain, clientId }) => `report/${domain}/${clientId}`,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        onCacheEntryAddedBody(
          SOCKET_CONNECTION_INFO,
          updateCachedData,
          cacheDataLoaded,
          cacheEntryRemoved
        );
      },
    }),

    getOtherInfo: build.query<TimelineEvent, Options>({
      query: ({ domain, clientId }) => `report/${domain}/${clientId}`,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        onCacheEntryAddedBody(
          SOCKET_OTHER_INFO,
          updateCachedData,
          cacheDataLoaded,
          cacheEntryRemoved
        );
      },
    }),

    getMediaInfo: build.query<TimelineEvent, Options>({
      query: ({ domain, clientId }) => `report/${domain}/${clientId}`,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        onCacheEntryAddedBody(
          'mediaInfo',
          updateCachedData,
          cacheDataLoaded,
          cacheEntryRemoved
        );
      },
    }),
  }),
});

export const { useGetReportQuery } = clientsApi;
export const { useGetConnectionInfoQuery } = clientsApi;
export const { useGetOtherInfoQuery } = clientsApi;
export const { useGetMediaInfoQuery } = clientsApi;

export default clientsApi;
