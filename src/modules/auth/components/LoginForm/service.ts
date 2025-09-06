import { LoginPayload } from '~/services/axios/actions/auth.action';
import { AppFormValue } from '~/types';

import { LOGIN_FORM_FIELDS } from './constant';

export const getLoginData = (values: AppFormValue): LoginPayload => {
  const email = values[LOGIN_FORM_FIELDS.EMAIL] as string;
  const password = values[LOGIN_FORM_FIELDS.PASSWORD] as string;

  return { email, password };
};
