'use client';

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { loginAdminAccount, LoginData } from '~/services/axios/actions/auth.action';
import { useAuth } from '~/stores/auth';
import { SubmitHandler } from 'react-hook-form';
import Form from '~/components/ui/Form';
import Input from '~/components/ui/Form/Input';
import AppButton from '~/components/ui/AppButton';
import { schema } from './validation';
import { ADMIN_LOGIN_FORM_FIELDS } from './constant';
import { HttpStatusCode } from 'axios';
import { getLoginData } from './service';
import ROUTES from '~/constants/routes';

const LoginAdminPage: React.FC = () => {
  const router = useRouter();
  const { setAuth } = useAuth();

  const handleSubmit: SubmitHandler<Object> = useCallback(
    async (values: Object) => {
      try {
        const loginData = getLoginData(values);
        const { accessToken } = await loginAdminAccount(loginData);

        setAuth(null, accessToken);
        toast.success('Đăng nhập thành công!');

        router.push(ROUTES.ADMIN_LOGIN);
      } catch (error: any) {
        const statusCode: number = error?.response?.data?.statusCode;

        if (statusCode === HttpStatusCode.BadRequest) {
          return toast.error('Email hoặc mật khẩu không chính xác!');
        } else if (statusCode === HttpStatusCode.Forbidden) {
          return toast.error('Tài khoản không có quyền admin');
        }

        toast.error('Đăng nhập thất bại, vui lòng thử lại!');
      }
    },
    [router, setAuth],
  );

  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-48 bg-third">
      <div className="mx-auto flex w-full max-w-full flex-row justify-center bg-primary text-white">
        <p>Bếp UIT&#39;s Administrator</p>
      </div>
      <div className="min-w-[500px] overflow-hidden rounded-lg border-2 border-solid border-primary bg-white p-4 shadow-md md:p-8">
        <Form className="mt-4" onSubmit={handleSubmit} validationSchema={schema}>
          <Input id={ADMIN_LOGIN_FORM_FIELDS.EMAIL} label="Email" placeholder="Nhập email" />

          <Input id={ADMIN_LOGIN_FORM_FIELDS.PASSWORD} label="Mật khẩu" type="password" placeholder="Nhập mật khẩu" />

          <AppButton className="mt-10 w-full rounded-lg py-3 text-lg font-semibold tracking-wider" type="submit">
            Đăng nhập
          </AppButton>
        </Form>
      </div>
    </div>
  );
};

export default LoginAdminPage;
