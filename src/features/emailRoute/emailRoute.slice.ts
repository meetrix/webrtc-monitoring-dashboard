import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import userVerifyApi from './emailRoute.api';
import { setToken } from '../../helper/localStorage';
import { setHeader } from '../../app/axios';
import { actions as appActions } from '../app/app.slice';

export interface IVerifyState {
  responseStatus: string;
  loading: boolean;
  error: any;
}

const initialState: IVerifyState = {
  responseStatus: '',
  loading: false,
  error: null,
};

export const VerifyAsync = createAsyncThunk(
  'account/verify',
  async (data: any, { rejectWithValue, dispatch }) => {
    // const { rejectWithValue } = thunkAPI;
    try {
      const response = await userVerifyApi(data);
      if (response.status === 200) {
        const token = response?.data?.data?.token;
        await setHeader(token);
        await setToken(token);
      }
      return response.data;
    } catch (error: any) {
      console.log(error);
      dispatch(
        appActions.triggerAlert({
          type: 'error',
          childern: error?.response?.data?.message || 'Error occurred',
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const verifySlice = createSlice({
  name: 'verify',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // signin
    builder.addCase(VerifyAsync.pending, (state, action) => {
      state.loading = true;
      state.responseStatus = 'false';
    });
    builder.addCase(VerifyAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.responseStatus = 'true';
    });
    builder.addCase(VerifyAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { actions } = verifySlice;

export const selectVerify = (state: RootState) => state.verify;

export default verifySlice.reducer;
