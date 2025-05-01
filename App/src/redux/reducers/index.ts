import { combineReducers } from 'redux';
import authReducer from './authReducer';
import themeReducer from './themeReducer';

const rootReducer:any = combineReducers({
  auth: authReducer,
  theme: themeReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // ✅ export this

export default rootReducer;

