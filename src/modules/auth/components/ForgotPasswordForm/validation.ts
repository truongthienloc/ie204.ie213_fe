import * as yup from 'yup';
import { FORGOT_PASSWORD_FORM_FIELDS } from './constant';

export const schema = yup
  .object({
    [FORGOT_PASSWORD_FORM_FIELDS.EMAIL]: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
  })
  .required();
