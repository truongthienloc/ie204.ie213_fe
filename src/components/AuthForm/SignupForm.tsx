'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Typography from '@mui/material/Typography';

import NavigationStatement from '~/modules/auth/components/NavigationStatement';
import InputValue from '~/types/InputValue';
import authAction from '~/services/axios/actions/auth.action';
import AppInput from '~/components/ui/AppInput';
import AppButton from '~/components/ui/AppButton';
import ROUTES from '~/constants/routes';
import { EMAIL_REGEX } from '~/constants';

function SignupForm() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<InputValue>({});
  const router = useRouter();

  const handleValidateForm = async () => {
    const errors: InputValue = {};

    if (!email.trim()) {
      errors.email = 'Vui lòng nhập email';
    } else if (!email.toLowerCase().match(EMAIL_REGEX)) {
      errors.email = 'Email không hợp lệ!';
    }

    if (!username.trim()) errors.username = 'Vui lòng nhập tên đăng nhập';

    if (!password.trim()) {
      errors.password = 'Vui lòng nhập mật khẩu';
    }

    if (!confirmPassword.trim()) errors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    else if (confirmPassword.trim() !== password.trim()) errors.confirmPassword = 'Xác nhận mật khẩu không chính xác!';

    setErrors(errors);

    if (!Object.keys(errors).length) {
      try {
        const res = await toast.promise(
          new Promise(async (resolve, reject) => {
            try {
              const res = await authAction.registerUserAccount(email, username, password);

              resolve(res);
            } catch (error) {
              reject(error);
            }
          }),
          {
            pending: 'Đang đăng ký',
            success: 'Đăng ký tài khoản mới thành công',
            error: 'Đăng ký thất bại',
          },
        );

        router.replace('/login');
      } catch (error: any) {
        if (error.response) {
          error?.response?.message?.map((item: string) => toast.error(item));
        }
      }
    }
  };

  const handleFocusInput = (key: string) => {
    const newError: InputValue = { ...errors };
    if (key === 'email') delete newError.email;
    else if (key === 'password') delete newError.password;
    else if (key === 'username') delete newError.username;
    else if (key === 'confirmPassword') delete newError.confirmPassword;
    setErrors(newError);
  };

  const handleSubmitForm = (event: FormEvent) => {
    event.preventDefault();
    handleValidateForm();
  };

  return (
    <>
      <div className="w-full overflow-hidden rounded-lg border-2 border-solid border-primary bg-white p-4 shadow-md md:p-8">
        <Typography component="h2" variant="h5" className="select-none text-center text-2xl font-semibold">
          ĐĂNG KÝ
        </Typography>

        <form action="#" method="POST" onSubmit={handleSubmitForm}>
          <AppInput
            id="email"
            label="Email"
            value={email}
            type="text"
            name="email"
            errorMessage={errors?.email}
            isRequired
            placeholder="Nhập email của bạn"
            onFocus={() => handleFocusInput('email')}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
          />

          <AppInput
            label="Tên đăng nhập"
            placeholder="Nhập tên đăng nhập"
            id="username"
            type="text"
            name="username"
            isRequired
            errorMessage={errors?.username}
            onFocus={() => handleFocusInput('username')}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}
          />

          <AppInput
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            id="password"
            type="password"
            name="password"
            isRequired
            errorMessage={errors?.password}
            onFocus={() => handleFocusInput('password')}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
          />

          <AppInput
            label="Xác nhận mật khẩu"
            placeholder="Xác nhận mật khẩu"
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            isRequired
            errorMessage={errors?.confirmPassword}
            onFocus={() => handleFocusInput('confirmPassword')}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(event.target.value)}
          />

          <div className="mt-4 w-full">
            <AppButton
              variant="primary"
              size="md"
              type="submit"
              className="w-full rounded-lg py-3 text-lg font-semibold tracking-wider"
            >
              Đăng ký
            </AppButton>
          </div>

          <div className="mt-4 w-full">
            <NavigationStatement question="Bạn đã có tài khoản? " content="Đăng nhập ngay" href={ROUTES.LOGIN} />
          </div>
        </form>
      </div>
    </>
  );
}

export default SignupForm;
