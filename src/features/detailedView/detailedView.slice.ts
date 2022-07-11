import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { troubleshooterDetailsGetAllApi } from './detailedView.api';

export interface IDetailedView {
  responseStatus: string;
  loading: boolean;
  responseMessage: string;
  error: any;
  troubleshooterDetails: any;
}

const initialState: IDetailedView = {
  responseStatus: '',
  loading: false,
  responseMessage: '',
  error: null,
  troubleshooterDetails: null,
};

export const troubleshooterGetAllAsync = createAsyncThunk(
  'troubleshooter/getAll',
  async (data: any, { rejectWithValue, dispatch }) => {
    try {
      const response = await troubleshooterDetailsGetAllApi(data);
      return response?.data?.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const detailViewSlice = createSlice({
  name: 'troubleshooterDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(troubleshooterGetAllAsync.pending, (state, action) => {
      state.loading = true;
      state.responseStatus = 'false';
    });
    builder.addCase(troubleshooterGetAllAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.responseStatus = 'true';
      state.troubleshooterDetails = action.payload;
    });
    builder.addCase(troubleshooterGetAllAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { actions } = detailViewSlice;

export const selectDetailView = (state: RootState) =>
  state.troubleshooterDetails.troubleshooterDetails;

export default detailViewSlice.reducer;
