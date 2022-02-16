import { configureStore } from '@reduxjs/toolkit';
import { MiddlewareAPI, Middleware, Action } from 'redux';
import { IUserState } from '../interfaces/apiInterfaces';
import userReducer from './userState/userSlice';
import statisticReducer from './userState/statisticSlice';
import wordReducer from './userState/wordsSlice';

const initialState: IUserState = {
  user: {
    id: '',
    name: '',
    token: '',
    refreshToken: '',
    error: null,
    loading: false,
  },
  userStatistic: {
    learnedWords: 0,
    id: '',
    optional: {
      short: {
        lastDate: 0,
        sprint: {
          newWords: 0,
          inARow: 0,
          percents: 0,
          allAnswers: 0,
          correctAnswers: 0,
        },
      },
      long: {
        stat: [],
      },
    },
  },
  userWords: [],
  deletedWords: [],
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
    userStatistic: statisticReducer,
    userWords: wordReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleWare),
  preloadedState: restoreStore(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
