import { api } from '..';
import authEndpoint from '../endpoints/auth.endpoint';

export type LoginData = {
  accessToken: string;
};

function loginAdminAccount(email: string, password: string) {
  return new Promise<LoginData>(async (resolve, reject) => {
    try {
      const res = await api.post(authEndpoint['admin-login'], {
        email,
        password,
      });

      const data = res.data.data as LoginData;
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

// user login
export async function loginUserAccount(email: string, password: string): Promise<LoginData> {
  const res = await api.post<LoginData>(authEndpoint.login, {
    email,
    password,
  });

  return res.data as LoginData;
}

// user register
function registerUserAccount(email: string, username: string, password: string) {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const res = await api.post(authEndpoint.register, {
        email,
        username,
        password,
      });

      const data = res.data;
      console.log(data);
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
}

const authAction = {
  loginAdminAccount,
  loginUserAccount,
  registerUserAccount,
};

export default authAction;
