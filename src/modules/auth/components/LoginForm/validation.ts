import * as yup from 'yup';
import { LOGIN_FORM_FIELDS } from './constant';

export const schema = yup
  .object({
    [LOGIN_FORM_FIELDS.EMAIL]: yup.string().required('Vui lòng nhập email').email('Email không hợp lệ'),
    [LOGIN_FORM_FIELDS.PASSWORD]: yup.string().required('Vui lòng nhập mật khẩu'),
  })
  .required();
