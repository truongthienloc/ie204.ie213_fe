import * as yup from 'yup';

import { ADMIN_LOGIN_FORM_FIELDS } from './constant';

export const schema = yup
  .object({
    [ADMIN_LOGIN_FORM_FIELDS.EMAIL]: yup.string().required('Vui lòng nhập email').email('Email không hợp lệ'),
    [ADMIN_LOGIN_FORM_FIELDS.PASSWORD]: yup.string().required('Vui lòng nhập mật khẩu'),
  })
  .required();
