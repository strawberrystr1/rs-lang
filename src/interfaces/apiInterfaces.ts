export interface IUserRegistration {
  email: string;
  password: string;
  name: string;
}

export interface IUserRegistrationResponse {
  id: string;
  name: string;
  email: string;
}

export interface IUserSignInParams {
  email: string;
  password: string;
}

export interface IUserLogInSuccess {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

export interface ICurrentUserState {
  id: string;
  name: string;
  token: string;
  refreshToken: string;
  error: null | string;
  loading: boolean;
}

export interface IUserState {
  user: ICurrentUserState
}
