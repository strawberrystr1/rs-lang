import { IUserRegistration } from '../interfaces/apiInterfaces';

export const newUser: IUserRegistration = {
  name: '',
  email: '',
  password: '',
};

export const BASE_URL = 'https://react-rslang-str.herokuapp.com/';

export const colors = [
  { name: '1', color: '#2e7d32' },
  { name: '2', color: 'rgb(212, 108, 18)' },
  { name: '3', color: '#2362d6' },
  { name: '4', color: 'rgb(84, 158, 143)' },
  { name: '5', color: 'rgb(80, 163, 198)' },
  { name: '6', color: 'rgb(92, 99, 102)' },
];
