import * as yup from 'yup';

import { SIGNUP_FORM_FIELDS } from './constant';

export const schema = yup
  .object({
    [SIGNUP_FORM_FIELDS.EMAIL]: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
    [SIGNUP_FORM_FIELDS.USERNAME]: yup.string().required('Vui lòng nhập tên đăng nhập'),
    [SIGNUP_FORM_FIELDS.PASSWORD]: yup
      .string()
      .required('Vui lòng nhập mật khẩu')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>_-]{8,}$/,
        'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ cái và số',
      ),
    [SIGNUP_FORM_FIELDS.CONFIRM_PASSWORD]: yup
      .string()
      .required('Vui lòng xác nhận mật khẩu')
      .oneOf([yup.ref(SIGNUP_FORM_FIELDS.PASSWORD)], 'Xác nhận mật khẩu không khớp'),
  })
  .required();
