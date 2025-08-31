import { ADMIN_LOGIN_FORM_FIELDS } from './constant';

export const getLoginData = (values: any) => {
  const email = values[ADMIN_LOGIN_FORM_FIELDS.EMAIL];
  const password = values[ADMIN_LOGIN_FORM_FIELDS.PASSWORD];

  return { email, password };
};
