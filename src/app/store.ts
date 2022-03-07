/* eslint-disable */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { appReducer } from '../features/app';
import { authReducer } from '../features/auth';
import { verifyReducer } from '../features/emailRoute';
import { forgotPasswordReducer } from '../features/forgotPassword';
import counterReducer from '../features/counter/counterSlice';
import debuggerSlice from '../features/debugger/debuggerSlice';
import { api } from '../services/apiService/api';
import { resetPasswordReducer } from '../features/resetPassword';
// import rootReducer from './root.reducer';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    debugger: debuggerSlice,
    app: appReducer,
    auth: authReducer,
    verify: verifyReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }).concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
