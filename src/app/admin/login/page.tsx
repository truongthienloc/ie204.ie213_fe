'use client';

import { HttpStatusCode } from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

import AppButton from '~/components/ui/AppButton';
import Form from '~/components/ui/Form';
import Input from '~/components/ui/Form/Input';
import ROUTES from '~/constants/routes';
import { loginAdminAccount } from '~/services/axios/actions/auth.action';
import { useAuth } from '~/stores/auth';

import { ADMIN_LOGIN_FORM_FIELDS } from './constant';
import { getLoginData } from './service';
import { schema } from './validation';

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
