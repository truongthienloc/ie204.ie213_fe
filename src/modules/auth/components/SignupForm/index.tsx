'use client';

import Typography from '@mui/material/Typography';
import { HttpStatusCode } from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

import NavigationStatement from '~/components/layouts/NavigationStatement';
import AppButton from '~/components/ui/AppButton';
import Form from '~/components/ui/Form';
import Input from '~/components/ui/Form/Input';
import ROUTES from '~/constants/routes';
import { registerUserAccount } from '~/services/axios/actions/auth.action';
import { AppFormValue } from '~/types';

import { SIGNUP_FORM_FIELDS } from './constant';
import { getSignupFormData } from './service';
import { schema } from './validation';

const SignupForm = () => {
  const router = useRouter();

  const handleSubmit: SubmitHandler<AppFormValue> = useCallback(
    async (values: AppFormValue) => {
      try {
        const signupData = getSignupFormData(values);
        await registerUserAccount(signupData);

        toast.success('Đăng nhập thành công!');
        router.push('/login');
      } catch (error: any) {
        const statusCode: number = error?.response?.data?.statusCode;

        if (statusCode === HttpStatusCode.BadRequest) {
          return toast.error('Thông tin chưa hợp lệ!');
        }

        toast.error('Đăng ký thất bại, vui lòng thử lại!');
      }
    },
    [router],
  );

  return (
    <>
      <div className="w-full overflow-hidden rounded-lg border-2 border-solid border-primary bg-white p-4 shadow-md md:p-8">
        <Typography component="h2" variant="h5" className="select-none text-center text-2xl font-semibold">
          ĐĂNG KÝ
        </Typography>

        <Form onSubmit={handleSubmit} validationSchema={schema}>
          <Input id={SIGNUP_FORM_FIELDS.EMAIL} label="Email" placeholder="Nhập email của bạn" />

          <Input id={SIGNUP_FORM_FIELDS.USERNAME} label="Tên đăng nhập" placeholder="Nhập tên đăng nhập" />

          <Input id={SIGNUP_FORM_FIELDS.PASSWORD} label="Mật khẩu" placeholder="Nhập mật khẩu" type="password" />

          <Input
            id={SIGNUP_FORM_FIELDS.CONFIRM_PASSWORD}
            label="Xác nhận mật khẩu"
            placeholder="Xác nhận mật khẩu"
            type="password"
          />

          <div className="mt-4 w-full">
            <AppButton type="submit" className="w-full rounded-lg py-3 text-lg font-semibold tracking-wider">
              Đăng ký
            </AppButton>
          </div>

          <div className="mt-4 w-full">
            <NavigationStatement question="Bạn đã có tài khoản? " content="Đăng nhập ngay" href={ROUTES.LOGIN} />
          </div>
        </Form>
      </div>
    </>
  );
};

export default SignupForm;
