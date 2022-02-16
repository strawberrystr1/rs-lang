import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  IUserLogInSuccess, IUserRegistration, IUserRegistrationResponse, IUserSignInParams, ICurrentUserState,
} from '../../interfaces/apiInterfaces';

// enum LogInResponseCodes {
//   IncorrectData = 403,
//   NoUser = 404,
//   Succses = 200,
// }

// enum RegistrationResponseCodes {
//   IncorrectData = 422,
//   Exists = 417,
//   Succses = 200,
//   SomethingWrong = 404,
// }

const initialState: ICurrentUserState = {
  id: '',
  name: '',
  token: '',
  refreshToken: '',
  error: null,
  loading: false,
};

export const signIn = createAsyncThunk(
  'user/signin',
  async (user: IUserSignInParams): Promise<IUserLogInSuccess> => {
    const response = await fetch('https://react-rslang-str.herokuapp.com/signin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: user.email, password: user.password }),
    });

    switch (response.status) {
      case (403): {
        throw new Error('Неправильный email или пароль');
      }
      case (404): {
        throw new Error('Такого пользователя не существует');
      }
      default: {
        const data = await response.json();
        return data;
      }
    }
  },
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user: IUserRegistration, { dispatch }): Promise<IUserRegistrationResponse> => {
    const response = await fetch('https://react-rslang-str.herokuapp.com/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    switch (response.status) {
      case (417): {
        throw new Error('Пользователь с данным email уже существует');
      }
      case (422): {
        throw new Error('Неверный логин или пароль');
      }
      case (404): {
        throw new Error('Что-то пошло не так');
      }
      default: {
        const data: IUserRegistrationResponse = await response.json();
        dispatch(signIn({ email: user.email, password: user.password }));
        return data;
      }
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: () => {
      localStorage.removeItem('appState');
      return initialState;
    },
    closeModal: (state) => ({
      ...state,
      error: null,
      loading: false,
    }),
    createUser: (state, action) => ({
      ...state,
      ...action,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(registerUser.fulfilled, (state, action) => ({
      ...state,
      id: action.payload.id,
      name: action.payload.name,
      loading: true,
    }));
    builder.addCase(registerUser.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: (action.error.message as string),
    }));
    builder.addCase(signIn.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(signIn.fulfilled, (state, action) => ({
      ...state,
      id: action.payload.userId,
      name: action.payload.name,
      loading: false,
      token: action.payload.token,
      refreshToken: action.payload.refreshToken,
      error: null,
    }));
    builder.addCase(signIn.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: (action.error.message as string),
    }));
  },
});

export const { closeModal, logOut } = userSlice.actions;
export default userSlice.reducer;
