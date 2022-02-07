import { IUserRegistration, IUserRegistrationResponse } from '../interfaces/apiInterfaces';
import { BASE_URL } from '../constants/apiConstants';

export async function createUser(user: IUserRegistration) {
  try {
    const rawResponse = await fetch(`${BASE_URL}users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (rawResponse.status === 417) {
      const cont = await rawResponse.text();
      throw new Error(cont);
    }

    const content: IUserRegistrationResponse = await rawResponse.json();
    return content;
  } catch (e) {
    const res = (e as Error).message;
    return res;
  }
}

export async function siginUser() {
  console.log('asd');
}
