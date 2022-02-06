import { configureStore } from '@reduxjs/toolkit';
import { MiddlewareAPI, Middleware, Action } from 'redux';
import userReducer from './userState/userSlice';

const localStorageMiddleWare: Middleware = (api: MiddlewareAPI) => (next) => <A extends Action>(action: A) => {
  const { getState } = api;
  const result = next(action);
  localStorage.setItem('appState', JSON.stringify(getState()));
  return result;
};

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleWare),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
