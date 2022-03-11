import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import userForgotPasswordApi from './incomingConnectons.api';

export interface IForgotPasswordState {
  responseStatus: string;
  loading: boolean;
  responseMessage: string;
  error: any;
}

const initialState: IForgotPasswordState = {
  responseStatus: '',
  loading: false,
  responseMessage: '',
  error: null,
};

export const forgotPasswordAsync = createAsyncThunk(
  'account/forgot',
  async (data: any, { rejectWithValue, dispatch }) => {
    // const { rejectWithValue } = thunkAPI;
    try {
      const response = await userForgotPasswordApi(data);
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
    builder.addCase(forgotPasswordAsync.pending, (state, action) => {
      state.loading = true;
      state.responseStatus = 'false';
    });
    builder.addCase(forgotPasswordAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.responseStatus = 'true';
      state.responseMessage = action.payload.message;
    });
    builder.addCase(forgotPasswordAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.responseMessage = 'error';
    });
  },
});

export const { actions } = forgotPasswordSlice;

export const selectForgotPassword = (state: RootState) => state.forgotPassword;

export default forgotPasswordSlice.reducer;
