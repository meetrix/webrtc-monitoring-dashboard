import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { getUserDetailsApi } from './userDetails.api';

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
export const userDetailsAsync = createAsyncThunk(
  'report/users/errors',
  async (data: any, { rejectWithValue, dispatch }) => {
    // const { rejectWithValue } = thunkAPI;
    try {
      const response = await getUserDetailsApi();
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const UserDetailsSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userDetailsAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userDetailsAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.userErrorList = action.payload.data.data.rooms;
    });
    builder.addCase(userDetailsAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// export const { actions } = UserDetailsSlice;

export const selectUserDetails = (state: RootState) => state.userErrorList;

export default UserDetailsSlice.reducer;
