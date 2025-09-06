import { AppFormValue } from '~/types';

import { FORGOT_PASSWORD_FORM_FIELDS } from './constant';

export const getForgotPasswordData = (values: AppFormValue) => {
  const email = values[FORGOT_PASSWORD_FORM_FIELDS.EMAIL];

  return { email };
};
