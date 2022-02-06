import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  IUserLogInSuccess, IUserRegistration, IUserRegistrationResponse, IUserSignInParams,
} from '../../interfaces/apiInterfaces';

export interface IUserState {
  id: string;
  name: string;
  token: string;
  refreshToken: string;
  error: null | string;
  loading: boolean;
}

const initialState: IUserState = {
  id: '',
  name: '',
  token: '',
  refreshToken: '',
  error: null,
  loading: false,
};

export const signIn = createAsyncThunk(
  'user/signin',
  async (user: IUserSignInParams): Promise<string | IUserLogInSuccess> => {
    try {
      console.log(user);
      const response = await fetch('https://react-rslang-str.herokuapp.com/signin', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email, password: user.password }),
      });

      if (response.status !== 200) {
        const text = await response.text();
        throw text;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return (error as string);
    }
  },
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user: IUserRegistration): Promise<IUserRegistrationResponse | string> => {
    try {
      const response = await fetch('https://react-rslang-str.herokuapp.com/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.status !== 200) {
        const text = await response.text();
        throw text;
      }

      const data: IUserRegistrationResponse = await response.json();

      return data;
    } catch (error) {
      return (error as string);
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: () => initialState,
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
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (typeof action.payload !== 'string') {
        return {
          ...state,
          id: action.payload.id,
          name: action.payload.name,
          loading: false,
        };
      }
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    });
    builder.addCase(registerUser.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.meta.requestStatus,
    }));
    builder.addCase(signIn.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(signIn.fulfilled, (state, action) => {
      if (typeof action.payload !== 'string') {
        return {
          ...state,
          id: action.payload.userId,
          name: action.payload.name,
          loading: false,
          token: action.payload.token,
          refreshToken: action.payload.refreshToken,
          error: null,
        };
      }
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    });
    builder.addCase(signIn.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.meta.requestStatus,
    }));
  },
});

export const { closeModal } = userSlice.actions;
export default userSlice.reducer;
