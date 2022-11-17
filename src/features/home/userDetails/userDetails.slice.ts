import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { getUserErrorsApi } from './userDetails.api';

export interface IUserDetailsState {
  loading: boolean;
  userErrorList: any;
  error: any;
}

const initialState: IUserDetailsState = {
  loading: false,
  userErrorList: [],
  error: null,
};
export const userErrorsAsync = createAsyncThunk(
  'report/users/errors',
  async (data: any, { rejectWithValue, dispatch }) => {
    // const { rejectWithValue } = thunkAPI;
    try {
      const response = await getUserErrorsApi(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const UserErrorsSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userErrorsAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userErrorsAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.userErrorList = action.payload.data.data;
    });
    builder.addCase(userErrorsAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// export const { actions } = UserDetailsSlice;

export const selectUserErrors = (state: RootState) => state.userErrorList;

export default UserErrorsSlice.reducer;
