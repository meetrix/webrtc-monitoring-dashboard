import { createSlice } from '@reduxjs/toolkit';
import peers from '../../mocks/peers';
import { getUrlParams } from '../../utils/urlUtils';

const { mockStats } = getUrlParams();
const initialState = mockStats ? peers : {};

export const debuggerSlice = createSlice({
  name: 'debugger',
  initialState,
  reducers: {},
});

export default debuggerSlice.reducer;
