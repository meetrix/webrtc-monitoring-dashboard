import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  userSigninApi,
  userSignupApi,
  getUserProfileApi,
  updateUserProfileApi,
  updateUserPasswordApi,
  clearFirstTimeUserFlagApi,
} from './auth.api';
import { setToken } from '../../helper/localStorage';
import { setHeader } from '../../app/axios';
import { actions as appActions } from '../app/app.slice';

export interface IPermissions {
  editGeneralSettings?: boolean;
  editPrivacyPolicySettings?: boolean;
  editTermsSettings?: boolean;
  editFAQSettings?: boolean;
  editContactInfoSettings?: boolean;
  editScreenAppSettings?: boolean;
}

export interface IAuthState {
  user: any;
  permissions?: IPermissions;
  isAuthenticated: boolean;
  loading: boolean;
  error: any;
}

const initialState: IAuthState = {
  user: null,
  isAuthenticated: false,
  permissions: {},
  loading: false,
  error: null,
};

export const logInAsync = createAsyncThunk(
  'auth/logIn',
  async (data: any, { rejectWithValue, dispatch }) => {
    // const { rejectWithValue } = thunkAPI;
    try {
      const response = await userSigninApi(data);
      if (response.status === 200) {
        const token = response?.data?.data?.token;
        await setHeader(token);
        await setToken(token);
        dispatch(getProfileAsync(null));
        dispatch(clearFirstTimeUserFlagAsync(null));
      }
      dispatch(
        appActions.triggerAlert({
          type: 'success',
          childern: response?.data?.message || '',
        })
      );

      return response.data;
    } catch (error: any) {
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

export const SignupAsync = createAsyncThunk(
  'auth/Signup',
  async (data: any, { rejectWithValue, dispatch }) => {
    // const { rejectWithValue } = thunkAPI;
    try {
      const response = await userSignupApi(data);
      if (response.status === 200) {
        await setHeader('');
        await setToken('');
      }
      dispatch(
        appActions.triggerAlert({
          type: 'success',
          childern: response?.data?.message || '',
        })
      );
      return response.data;
    } catch (error: any) {
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

export const getProfileAsync = createAsyncThunk(
  'auth/profile',
  async (data: any, { rejectWithValue, dispatch }) => {
    try {
      dispatch(appActions.appLoadingStart());

      const response = await getUserProfileApi();
      // const permissions = filterRolePermissions(response?.data?.data?.role);
      // dispatch(actions.updatePermission(permissions));
      dispatch(appActions.appLoadingCompleted());
      return response?.data;
    } catch (err) {
      await setToken('');
      return rejectWithValue(err);
    } finally {
      dispatch(appActions.appLoadingCompleted());
    }
  }
);

export const updateProfileAsync = createAsyncThunk(
  'auth/profile/update',
  async (data: any, { rejectWithValue, dispatch }) => {
    try {
      const response = await updateUserProfileApi(data);
      dispatch(
        appActions.triggerAlert({
          type: 'success',
          childern: ' successfully update profile',
        })
      );
      return response.data;
    } catch (error: any) {
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

export const updateUserPasswordAsync = createAsyncThunk(
  'auth/password/update',
  async (data: any, { rejectWithValue, dispatch }) => {
    try {
      const response = await updateUserPasswordApi(data);
      dispatch(
        appActions.triggerAlert({
          type: 'success',
          childern: ' successfully update password',
        })
      );
      return response.data;
    } catch (error: any) {
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

export const clearFirstTimeUserFlagAsync = createAsyncThunk(
  'auth/first-time',
  async (data: any, { rejectWithValue, dispatch }) => {
    try {
      const response = await clearFirstTimeUserFlagApi();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.permissions = {};
    },
    updatePermission(state, action) {
      state.permissions = action?.payload;
    },
  },
  extraReducers: (builder) => {
    // signin
    builder.addCase(logInAsync.pending, (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
    });
    builder.addCase(logInAsync.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(logInAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // get profile
    builder.addCase(getProfileAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProfileAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action?.payload?.data;
      state.isAuthenticated = true;
    });
    builder.addCase(getProfileAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    });

    // update profile
    builder.addCase(updateProfileAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateProfileAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action?.payload?.data;
      state.isAuthenticated = true;
    });
    builder.addCase(updateProfileAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    });

    // clear first time user flag
    builder.addCase(clearFirstTimeUserFlagAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(clearFirstTimeUserFlagAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.user = {
        ...state.user,
        data: { ...state.user.data, isFirstTimeUser: false },
      };
      state.isAuthenticated = true;
    });
    builder.addCase(clearFirstTimeUserFlagAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    });
  },
});

export const { actions } = authSlice;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
