import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { AlertTypes } from '../../components/types';

export interface IAppState {
  loading: boolean;
  alert: {
    isOpen: boolean;
    type: AlertTypes;
    childern: any;
  };
  selectedDateOfWeek: any;
}

const initialState: IAppState = {
  loading: true,
  alert: {
    isOpen: false,
    type: 'success',
    childern: null,
  },
  selectedDateOfWeek: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    triggerAlert(state, action) {
      state.alert = {
        isOpen: true,
        type: action?.payload?.type,
        childern: action?.payload?.childern,
      };
    },
    closeAlert(state) {
      state.alert = {
        isOpen: false,
        type: 'success',
        childern: null,
      };
    },
    appLoadingStart(state) {
      state.loading = true;
    },
    appLoadingCompleted(state) {
      state.loading = false;
    },
    setValue(state, action) {
      state.selectedDateOfWeek = action?.payload?.value;
    },
  },
});

export const { actions } = appSlice;

export const selectApp = (state: RootState) => state.app;

export default appSlice.reducer;
