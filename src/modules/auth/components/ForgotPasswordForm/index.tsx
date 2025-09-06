'use client';

import Typography from '@mui/material/Typography';
import { useCallback } from 'react';
import { SubmitHandler } from 'react-hook-form';

import NavigationStatement from '~/components/layouts/NavigationStatement';
import Form from '~/components/ui/Form';
import Input from '~/components/ui/Form/Input';
import ROUTES from '~/constants/routes';
import { AppFormValue } from '~/types';

import { FORGOT_PASSWORD_FORM_FIELDS } from './constant';
import { getForgotPasswordData } from './service';
import { schema } from './validation';
import AppButton from '../../../../components/ui/AppButton';

const ForgotPasswordForm = () => {
  const handleSubmit: SubmitHandler<AppFormValue> = useCallback((values: AppFormValue) => {
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
          <AppButton type="submit" className="w-full rounded-lg py-3 text-lg tracking-wider">
            Gửi mật khẩu
          </AppButton>
        </div>

        <div className="mt-4 w-full">
          <NavigationStatement question="Đã nhớ mật khẩu? " content="Đăng nhập ngay" href={ROUTES.LOGIN} />
        </div>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;
