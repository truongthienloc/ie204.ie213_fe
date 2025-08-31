import { api } from '..';
import authEndpoint from '../endpoints/auth.endpoint';

export type LoginData = {
  accessToken: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

type SignupPayload = {
  email: string;
  username: string;
  password: string;
};

export const loginAdminAccount = async (loginData: LoginPayload): Promise<LoginData> => {
  const res = await api.post(authEndpoint['admin-login'], loginData);

  return res.data.data as LoginData;
};

export const loginUserAccount = async (loginData: LoginPayload): Promise<LoginData> => {
  const res = await api.post(authEndpoint.login, loginData);

  return res.data.data as LoginData;
};

export const registerUserAccount = async (singupData: SignupPayload) => {
  await api.post(authEndpoint.register, singupData);
};
