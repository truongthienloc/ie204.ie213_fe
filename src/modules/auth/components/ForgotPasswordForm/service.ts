import { FORGOT_PASSWORD_FORM_FIELDS } from './constant';

export const getForgotPasswordData = (values: any) => {
  const email = values[FORGOT_PASSWORD_FORM_FIELDS.EMAIL];

  return { email };
};
