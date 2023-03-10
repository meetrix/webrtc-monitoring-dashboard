import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  iceServerConfigGetApi,
  iceServerConfigSetApi,
  pluginCreateApi,
  pluginGetAllApi,
  pluginRegenerateApi,
  pluginRevokeApi,
} from './settings.api';

export interface IPlugin {
  _id: string;
  domain: string;
  createdAt: string;
}

export interface ISettingsState {
  responseStatus: string;
  loading: boolean;
  responseMessage: string;
  error: any;
  plugins: IPlugin[];
  config: any;
  iceServerConfigType: string;
  selectedDomain: string;
  token: string;
  isServerSettingsPage: boolean;
}

const initialState: ISettingsState = {
  responseStatus: '',
  loading: false,
  responseMessage: '',
  error: null,
  plugins: [],
  config: null,
  iceServerConfigType: '',
  selectedDomain: '',
  token: '',
  isServerSettingsPage: false,
};

// TODO: maybe give plugin its own slice

export const pluginGetAllAsync = createAsyncThunk(
  'plugin/getAll',
  async (data: void, { rejectWithValue, dispatch }) => {
    try {
      const response = await pluginGetAllApi();
      return response?.data?.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const pluginCreateAsync = createAsyncThunk(
  'plugin/create',
  async (data: any, { rejectWithValue, dispatch }) => {
    try {
      const response = await pluginCreateApi(data);
      return response?.data?.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const pluginRevokeAsync = createAsyncThunk(
  'plugin/revoke',
  async (data: any, { rejectWithValue, dispatch }) => {
    try {
      const response = await pluginRevokeApi(data);
      return response?.data?.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const pluginRegenerateAsync = createAsyncThunk(
  'plugin/regenerate',
  async (data: any, { rejectWithValue, dispatch }) => {
    try {
      const response = await pluginRegenerateApi(data);
      return response?.data?.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const iceServerConfigSetAsync = createAsyncThunk(
  'plugin/setConfig',
  async (data: any, { rejectWithValue, dispatch }) => {
    try {
      const response = await iceServerConfigSetApi(data);
      return response?.data?.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const iceServerConfigGetAsync = createAsyncThunk(
  'plugin/getConfig',
  async (data: any, { rejectWithValue, dispatch }) => {
    try {
      const response = await iceServerConfigGetApi(data);
      return response?.data?.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    clearConfigs(state) {
      state.config = initialState.config;
      state.iceServerConfigType = initialState.iceServerConfigType;
    },
    setDomainName(state, action) {
      state.selectedDomain = action?.payload;
    },
    setToken(state, action) {
      state.token = action?.payload;
    },
    setSettingsPage(state, action) {
      state.isServerSettingsPage = action?.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(pluginGetAllAsync.pending, (state, action) => {
      state.loading = true;
      state.responseStatus = 'false';
    });
    builder.addCase(pluginGetAllAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.responseStatus = 'true';
      state.plugins = action.payload;
    });
    builder.addCase(pluginGetAllAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // We don't need `get` api here; it's needed wherever the plugin is used to get a token

    builder.addCase(pluginCreateAsync.pending, (state, action) => {
      state.loading = true;
      state.responseStatus = 'false';
    });
    builder.addCase(pluginCreateAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.responseStatus = 'true';
      state.plugins.push(action.payload);
    });
    builder.addCase(pluginCreateAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(pluginRevokeAsync.pending, (state, action) => {
      state.loading = true;
      state.responseStatus = 'false';
    });
    builder.addCase(pluginRevokeAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.responseStatus = 'true';
      state.plugins = state.plugins.filter(
        (plugin) => plugin._id !== action.payload._id
      );
    });
    builder.addCase(pluginRevokeAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(pluginRegenerateAsync.pending, (state, action) => {
      state.loading = true;
      state.responseStatus = 'false';
    });
    builder.addCase(pluginRegenerateAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.responseStatus = 'true';
      state.plugins = [
        ...state.plugins.filter(
          (plugin) => plugin.domain !== action.payload.domain
        ),
        action.payload,
      ];
    });
    builder.addCase(pluginRegenerateAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(iceServerConfigSetAsync.pending, (state, action) => {
      state.loading = true;
      state.responseStatus = 'false';
    });
    builder.addCase(iceServerConfigSetAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.responseStatus = 'true';
    });
    builder.addCase(iceServerConfigSetAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(iceServerConfigGetAsync.pending, (state, action) => {
      state.loading = true;
      state.responseStatus = 'false';
    });
    builder.addCase(iceServerConfigGetAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.responseStatus = 'true';
      state.config = action?.payload;
      state.iceServerConfigType = action?.payload?.mode;
    });
    builder.addCase(iceServerConfigGetAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { actions } = settingsSlice;
export const {
  clearConfigs,
  setDomainName,
  setToken,
  setSettingsPage,
} = settingsSlice.actions;
export const selectPlugins = (state: RootState) => state.settings.plugins;
export const selectConfig = (state: RootState) => state.settings;

export default settingsSlice.reducer;
