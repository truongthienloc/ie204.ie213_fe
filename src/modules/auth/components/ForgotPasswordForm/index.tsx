'use client';

import Typography from '@mui/material/Typography';

import NavigationStatement from '~/components/layouts/NavigationStatement';

import AppButton from '../../../../components/ui/AppButton';
import ROUTES from '~/constants/routes';
import Form from '~/components/ui/Form';
import { schema } from './validation';
import Input from '~/components/ui/Form/Input';
import { SubmitHandler } from 'react-hook-form';
import { getForgotPasswordData } from './service';
import { FORGOT_PASSWORD_FORM_FIELDS } from './constant';
import { useCallback } from 'react';

function ForgotPasswordForm() {
  const handleSubmit: SubmitHandler<Object> = useCallback((values: Object) => {
    const forgotPasswordData = getForgotPasswordData(values);
    console.log(forgotPasswordData);
    // TODO: call api
  }, []);

  return (
    <div className="overflow-hidden rounded-lg border-2 border-solid border-primary bg-white p-4 shadow-md md:p-8">
      <Typography component="h2" variant="h5" className="select-none text-center text-2xl font-semibold">
        QUÊN MẬT KHẨU
      </Typography>
      <Form onSubmit={handleSubmit} validationSchema={schema}>
        <Input id={FORGOT_PASSWORD_FORM_FIELDS.EMAIL} label="Email" placeholder="Nhập email của bạn" />

        <p className="mt-4 select-none text-center text-lg">Mật khẩu mới sẽ được gửi đến email của bạn!</p>

        <div className="mt-4 w-full">
          <AppButton
            type="submit"
            variant="primary"
            size="md"
            className="w-full rounded-lg py-3 text-lg tracking-wider"
          >
            Gửi mật khẩu
          </AppButton>
        </div>

        <div className="mt-4 w-full">
          <NavigationStatement question="Đã nhớ mật khẩu? " content="Đăng nhập ngay" href={ROUTES.LOGIN} />
        </div>
      </Form>
    </div>
  );
}

export default ForgotPasswordForm;
