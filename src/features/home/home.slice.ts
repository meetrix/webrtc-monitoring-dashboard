import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getMeetingsApi } from './home.api';

export interface ICallStatsState {
  responseStatus: string;
  loading: boolean;
  responseMessage: string;
  error: any;
}

const initialState: ICallStatsState = {
  responseStatus: '',
  loading: false,
  responseMessage: '',
  error: null,
};
export const meetingListAsync = createAsyncThunk(
  'report/room',
  async (data: any, { rejectWithValue, dispatch }) => {
    // const { rejectWithValue } = thunkAPI;
    console.log('kkkkk meetingListAsync');
    try {
      const response = await getMeetingsApi();
      return response;
    } catch (error: any) {
      //   dispatch(
      //     appActions.triggerAlert({
      //       type: 'error',
      //       childern: error?.response?.data?.message || 'Error occurred',
      //     })
      //   );
      return rejectWithValue(error);
    }
  }
);
export const meetingListSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // signin
    builder.addCase(meetingListAsync.pending, (state, action) => {
      console.log('kkkkk meetingListSlice pending', action);
      state.loading = true;
      state.responseStatus = 'false';
    });
    builder.addCase(meetingListAsync.fulfilled, (state, action) => {
      console.log('kkkkk meetingListSlice fulfil', action);
      state.loading = false;
      state.responseStatus = 'true';
      // state.responseMessage = action.payload.message;
    });
    builder.addCase(meetingListAsync.rejected, (state, action) => {
      console.log('kkkkk meetingListSlice reject');
      state.loading = false;
      state.error = action.payload;
      state.responseMessage = 'error';
    });
  },
});

export const { actions } = meetingListSlice;

export const selectMeetingList = (state: RootState) => state.meetingList;

export default meetingListSlice.reducer;
