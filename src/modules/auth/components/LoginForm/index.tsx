'use client';

import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import AppButton from '~/components/ui/AppButton';
import NavigationStatement from '../../../../components/layouts/NavigationStatement';
import { useAuth } from '~/stores/auth';
import { loginUserAccount } from '~/services/axios/actions/auth.action';
import ROUTES from '~/constants/routes';
import { HttpStatusCode } from 'axios';
import Input from '~/components/ui/Form/Input';
import Form from '~/components/ui/Form';

import { LOGIN_FORM_FIELDS } from './constant';
import { SubmitHandler } from 'react-hook-form';
import { getLoginData } from './service';
import { schema } from './validation';
import { useCallback } from 'react';

const LoginForm = () => {
  const { setAuth } = useAuth();
  const router = useRouter();

  const handleSubmit: SubmitHandler<Object> = useCallback(
    async (values: Object) => {
      try {
        const loginData = getLoginData(values);
        const { accessToken } = await loginUserAccount(loginData);

        setAuth(null, accessToken);
        toast.success('Đăng nhập thành công!');
        router.push(ROUTES.HOME);
      } catch (error: any) {
        const statusCode: number = error?.response?.data?.statusCode;

        if (statusCode === HttpStatusCode.BadRequest) {
          return toast.error('Email hoặc mật khẩu không chính xác!');
        }

        toast.error('Đăng nhập thất bại, vui lòng thử lại!');
      }
    },
    [router, setAuth],
  );

  return (
    <div className="w-full overflow-hidden rounded-lg border-2 border-solid border-primary bg-white p-4 shadow-md md:p-8">
      <Typography component="h2" className="select-none text-center text-2xl font-semibold">
        ĐĂNG NHẬP
      </Typography>

      <Form className="mt-4" onSubmit={handleSubmit} validationSchema={schema}>
        <Input label="Email" placeholder="Nhập email của bạn..." id={LOGIN_FORM_FIELDS.EMAIL} type="text" />

        <Input
          label="Mật khẩu"
          placeholder="Nhập mật khẩu của bạn..."
          id={LOGIN_FORM_FIELDS.PASSWORD}
          type="password"
        />

        <div className={'mt-4 text-right font-medium hover:opacity-80'}>
          <Link href={ROUTES.FORGOT_PASSWORD}>Quên mật khẩu ?</Link>
        </div>

        <div className="mt-4 w-full">
          <AppButton
            variant="primary"
            size="md"
            type="submit"
            className="w-full rounded-lg py-3 text-lg font-semibold tracking-wider"
          >
            Đăng nhập
          </AppButton>
        </div>

        <div className="mt-4 w-full">
          <div className="flex items-center">
            <div className="h-px w-full bg-black/10"></div>
            <span className="z-1 px-3 text-base text-[#c3c3c3]">HOẶC</span>
            <div className="h-px w-full bg-black/10"></div>
          </div>
        </div>

        <div className="mt-4 w-full">
          <div className="flex items-center justify-between gap-4">
            <AppButton
              variant="outlined"
              className="flex flex-1 select-none items-center justify-center gap-2 border border-secondary text-secondary"
            >
              <Image alt="facebook logo" src="/logos/facebook.svg" width={32} height={32} />
              <span>Facebook</span>
            </AppButton>
            <AppButton
              variant="outlined"
              className="flex flex-1 select-none items-center justify-center gap-2 border border-secondary text-secondary"
            >
              <Image alt="google logo" src="/logos/google.svg" width={32} height={32} />
              <span>Google</span>
            </AppButton>
          </div>
        </div>

        <div className="mt-4 w-full">
          <NavigationStatement question="Bạn chưa có tài khoản? " content="Đăng ký ngay" href={ROUTES.SIGNUP} />
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
