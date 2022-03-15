import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import callStatsApi from './callStats.api';

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

export const callStatsAsync = createAsyncThunk(
  'account/forgot',
  async (data: any, { rejectWithValue, dispatch }) => {
    // const { rejectWithValue } = thunkAPI;
    try {
      const response = await callStatsApi(data);
      return response.data;
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

export const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // signin
    builder.addCase(callStatsAsync.pending, (state, action) => {
      state.loading = true;
      state.responseStatus = 'false';
    });
    builder.addCase(callStatsAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.responseStatus = 'true';
      state.responseMessage = action.payload.message;
    });
    builder.addCase(callStatsAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.responseMessage = 'error';
    });
  },
});

export const { actions } = forgotPasswordSlice;

export const selectForgotPassword = (state: RootState) => state.forgotPassword;

export default forgotPasswordSlice.reducer;
