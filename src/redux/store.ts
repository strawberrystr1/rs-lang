import { configureStore } from '@reduxjs/toolkit';
import { MiddlewareAPI, Middleware, Action } from 'redux';
import { IUserState } from '../interfaces/apiInterfaces';
import userReducer from './userState/userSlice';

const initialState: IUserState = {
  user: {
    id: '',
    name: '',
    token: '',
    refreshToken: '',
    error: null,
    loading: false,
  },
};

const localStorageMiddleWare: Middleware = (api: MiddlewareAPI) => (next) => <A extends Action>(action: A) => {
  const { getState } = api;
  const result = next(action);
  if (getState().user.name) {
    localStorage.setItem('appState', JSON.stringify(getState()));
  }
  return result;
};

const restoreStore = () => {
  if (localStorage.getItem('appState') !== null) {
    return JSON.parse((localStorage.getItem('appState') as string));
  }
  return initialState;
};

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleWare),
  preloadedState: restoreStore(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
