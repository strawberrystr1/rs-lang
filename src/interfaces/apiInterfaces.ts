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
