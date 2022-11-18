import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getMeetingsApi } from './home.api';

export interface ICallStatsState {
  loading: boolean;
  meetingList: any;
  error: any;
}

const initialState: ICallStatsState = {
  loading: false,
  meetingList: [],
  error: null,
};
export const meetingListAsync = createAsyncThunk(
  'report/meetingList',
  async (data: any, { rejectWithValue, dispatch }) => {
    // const { rejectWithValue } = thunkAPI;
    try {
      const response = await getMeetingsApi(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const meetingListSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(meetingListAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(meetingListAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.meetingList = action.payload.data.data;
    });
    builder.addCase(meetingListAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// export const { actions } = meetingListSlice;

export const selectMeetingList = (state: RootState) => state.meetingList;

export default meetingListSlice.reducer;
