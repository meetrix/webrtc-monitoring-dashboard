import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { troubleshooterGetSummaryApi } from './overview.api';

export interface ISummaryView {
  responseStatus: string;
  loading: boolean;
  responseMessage: string;
  error: any;
  troubleshooterSummary: any;
}

const initialState: ISummaryView = {
  responseStatus: '',
  loading: false,
  responseMessage: '',
  error: null,
  troubleshooterSummary: null,
};

export const troubleshooterGetSummaryAsync = createAsyncThunk(
  'troubleshooter/getSummary',
  async (data: any, { rejectWithValue, dispatch }) => {
    try {
      const response = await troubleshooterGetSummaryApi(data);
      return response?.data?.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const overviewSlice = createSlice({
  name: 'troubleshooterSummary',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(troubleshooterGetSummaryAsync.pending, (state, action) => {
      state.loading = true;
      state.responseStatus = 'false';
    });
    builder.addCase(
      troubleshooterGetSummaryAsync.fulfilled,
      (state, action) => {
        state.loading = false;
        state.responseStatus = 'true';
        state.troubleshooterSummary = action.payload;
      }
    );
    builder.addCase(troubleshooterGetSummaryAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { actions } = overviewSlice;

export const selectSummaryView = (state: RootState) =>
  state.troubleshooterSummary.troubleshooterSummary;

export default overviewSlice.reducer;
