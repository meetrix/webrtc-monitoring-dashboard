import { combineReducers } from 'redux';

import { authReducer } from '../features/auth';
// import { usersReducer } from '../features/users';
import { appReducer } from '../features/app';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  // users: usersReducer
});

export default rootReducer;
