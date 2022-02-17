import { createSlice } from '@reduxjs/toolkit';
import { Report } from '@meetrix/webrtc-monitoring-common-lib';
import { mockReport } from '../../mocks/report';
import { RootState } from '../../app/store';
import { getUrlParams } from '../../utils/urlUtils';

const { mockStats } = getUrlParams();
const initialState = {
  reports: mockStats ? [mockReport] : undefined,
};

export type ReportType = Report[] | undefined;

export const debuggerSlice = createSlice({
  name: 'debugger',
  initialState,
  reducers: {},
});
export const selectPeers = (state: RootState): ReportType =>
  state?.debugger?.reports as ReportType;

export default debuggerSlice.reducer;
