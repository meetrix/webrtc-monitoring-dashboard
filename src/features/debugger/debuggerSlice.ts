import { createSlice } from '@reduxjs/toolkit';
import { Peer } from '@meetrix/webrtc-monitoring-common-lib';
import peers from '../../mocks/peers';
import { RootState } from '../../app/store';
import { getUrlParams } from '../../utils/urlUtils';

const { mockStats } = getUrlParams();
const initialState = {
  peers: mockStats ? (peers as Peer[]) : undefined,
};

export type PeersType = Peer[] | undefined;

export const debuggerSlice = createSlice({
  name: 'debugger',
  initialState,
  reducers: {},
});
export const selectPeers = (state: RootState): PeersType =>
  state?.debugger?.peers;

export default debuggerSlice.reducer;
