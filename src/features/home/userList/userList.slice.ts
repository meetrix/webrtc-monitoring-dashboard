import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { getAllUsersApi, getUserErrorsApi } from './userList.api';

export interface IUserListState {
  loading: boolean;
  userList: any;
  userErrorList: any;
  error: any;
}

const initialState: IUserListState = {
  loading: false,
  userList: [],
  userErrorList: [],
  error: null,
};

export const userListAsync = createAsyncThunk(
  'report/users',
  async (data: any, { rejectWithValue, dispatch }) => {
    try {
      const response = await getAllUsersApi(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
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
    // Get selected room's users
    builder.addCase(userListAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userListAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.userList = action.payload.data.data;
    });
    builder.addCase(userListAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Get selected user's errors
    builder.addCase(userErrorsAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userErrorsAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.userErrorList = action.payload.data;
    });
    builder.addCase(userErrorsAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// export const { actions } = UserDetailsSlice;

export const selectUserList = (state: RootState) => state.userList;
export const selectUserErrors = (state: RootState) => state.userErrorList;

export default UserErrorsSlice.reducer;
