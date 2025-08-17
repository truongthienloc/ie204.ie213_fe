'use client';

import { useState, FormEvent } from 'react';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import AppInput from '~/components/ui/AppInput';
import AppButton from '~/components/ui/AppButton';
import NavigationStatement from './NavigationStatement';
import { useAuth } from '~/stores/auth';
import { loginUserAccount } from '~/services/axios/actions/auth.action';
import { useCart } from '~/stores/cart/useCart';
import { EMAIL_REGEX } from '~/constants';
import ROUTES from '~/constants/routes';
import { HttpStatusCode } from 'axios';

type LoginFormState = {
  email?: string;
  password?: string;
};

function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<LoginFormState>({});
  const { setAuth } = useAuth();
  const router = useRouter();

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const errors: LoginFormState = {};

    if (!email.trim()) {
      errors.email = 'Vui lòng nhập email!';
    } else if (!email.toLowerCase().match(EMAIL_REGEX)) {
      errors.email = 'Email không hợp lệ!';
    }

    if (!password.trim()) {
      errors.password = 'Vui lòng nhập mật khẩu!';
    }

    setErrors(errors);

    if (!Object.keys(errors).length) {
      try {
        const { accessToken } = await loginUserAccount(email, password);
        setAuth(null, accessToken);
        toast.success('Đăng nhập thành công!');
        router.replace(ROUTES.HOME);
      } catch (error: any) {
        console.error('Login error:', error?.response?.data);
        const statusCode: number = error?.response?.data?.statusCode;

        if (statusCode === HttpStatusCode.BadRequest) {
          return toast.error('Email hoặc password không chính xác!');
        }

        toast.error('Đăng nhập thất bại, vui lòng thử lại sau!');
      }
    }
  };

  const handleFocusInput = (key: keyof LoginFormState) => {
    const newError: LoginFormState = { ...errors };
    delete newError[key];
    setErrors(newError);
  };

  return (
    <div className="w-full overflow-hidden rounded-lg border-2 border-solid border-primary bg-white p-4 shadow-md md:p-8">
      <Typography component="h2" className="select-none text-center text-2xl font-semibold">
        ĐĂNG NHẬP
      </Typography>

      <form action="#" method="POST" className="mt-4" onSubmit={onSubmit}>
        <AppInput
          label="Email"
          isRequired
          placeholder="Nhập email của bạn..."
          id="email"
          value={email}
          type="text"
          name="email"
          onFocus={() => handleFocusInput('email')}
          errorMessage={errors?.email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
        />

        <AppInput
          label="Mật khẩu"
          isRequired
          placeholder="Nhập mật khẩu của bạn..."
          id="password"
          type="password"
          name="password"
          onFocus={() => handleFocusInput('password')}
          errorMessage={errors?.password}
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
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
              size="md"
              className="flex flex-1 select-none items-center justify-center gap-2 border border-secondary text-secondary"
            >
              <Image alt="facebook logo" src="/logos/facebook.svg" width={32} height={32} />
              <span>Facebook</span>
            </AppButton>
            <AppButton
              variant="outlined"
              size="md"
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
      </form>
    </div>
  );
}

export default LoginForm;
