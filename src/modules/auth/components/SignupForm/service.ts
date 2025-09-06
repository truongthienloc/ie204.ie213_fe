import { SignupPayload } from '~/services/axios/actions/auth.action';
import { AppFormValue } from '~/types';

import { SIGNUP_FORM_FIELDS } from './constant';

export const getSignupFormData = (values: AppFormValue): SignupPayload => {
  const username = values[SIGNUP_FORM_FIELDS.USERNAME] as string;
  const email = values[SIGNUP_FORM_FIELDS.EMAIL] as string;
  const password = values[SIGNUP_FORM_FIELDS.PASSWORD] as string;

  return { username, email, password };
};
