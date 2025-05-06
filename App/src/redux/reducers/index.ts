import { combineReducers } from 'redux';
import authReducer from './authReducer';
import themeReducer from './themeReducer';
import fcmReducer from './fcmReducer';

const rootReducer:any = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  fcm:fcmReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // ✅ export this

export default rootReducer;

