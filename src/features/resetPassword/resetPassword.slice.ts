import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import resetPasswordApi from './resetPassword.api';
// import { actions as appActions } from '../app/app.slice';

export interface IVerifyState {
  responseStatus: string;
  loading: boolean;
  responseMessage: string;
  error: any;
}

const initialState: IVerifyState = {
  responseStatus: '',
  loading: false,
  responseMessage: '',
  error: null,
};

export const resetPasswordAsync = createAsyncThunk(
  'account/resetpassword',
  async (data: any, { rejectWithValue, dispatch }) => {
    // const { rejectWithValue } = thunkAPI;
    try {
      const response = await resetPasswordApi(data);
      return response.data;
    } catch (error: any) {
      dispatch(
        resetPasswordSlice.actions.updateResponseMessage(
          error?.response?.data?.message
        )
      );
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

export const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {
    updateResponseMessage(state, action) {
      state.responseMessage = action?.payload;
    },
  },
  extraReducers: (builder) => {
    // signin
    builder.addCase(resetPasswordAsync.pending, (state, action) => {
      state.loading = true;
      state.responseStatus = 'false';
    });
    builder.addCase(resetPasswordAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.responseStatus = 'true';
      state.responseMessage = action.payload.message;
    });
    builder.addCase(resetPasswordAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { actions } = resetPasswordSlice;

export const selectResetPassword = (state: RootState) => state.resetPassword;

export default resetPasswordSlice.reducer;
