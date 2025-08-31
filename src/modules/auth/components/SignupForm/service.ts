import { SIGNUP_FORM_FIELDS } from './constant';

export const getSignupFormData = (values: any) => {
  const username = values[SIGNUP_FORM_FIELDS.USERNAME];
  const email = values[SIGNUP_FORM_FIELDS.EMAIL];
  const password = values[SIGNUP_FORM_FIELDS.PASSWORD];

  return { username, email, password };
};
