'use client';

import { FormEvent, useState } from 'react';
import Typography from '@mui/material/Typography';

import AppInput from '~/components/ui/AppInput';
import NavigationStatement from '~/modules/auth/components/NavigationStatement';
import InputValue from '~/types/InputValue';
import { EMAIL_REGEX } from '~/constants';
import AppButton from '../ui/AppButton';
import ROUTES from '~/constants/routes';

function ForgotPasswordForm() {
  const [email, setEmail] = useState<string>('');
  const [errors, setErrors] = useState<InputValue>({});

  const handleValidateForm = (values: InputValue) => {
    const errors: InputValue = {};

    if (!email.trim()) {
      errors.email = 'Vui lòng nhập email!';
    } else if (!email.toLowerCase().match(EMAIL_REGEX)) {
      errors.email = 'Email không hợp lệ!';
    }

    setErrors(errors);

    if (!Object.keys(errors).length) {
      // call API here
      console.log('Form submit successfully');
    }
  };

  const handleFocusInput = (key: string) => {
    const newError: InputValue = { ...errors };
    if (key === 'email') delete newError.email;
    else if (key === 'password') delete newError.password;
    setErrors(newError);
  };

  const handleSubmitForm = (event: FormEvent) => {
    event.preventDefault();
    handleValidateForm({ email });
  };

  return (
    <div className="overflow-hidden rounded-lg border-2 border-solid border-primary bg-white p-4 shadow-md md:p-8">
      <Typography component="h2" variant="h5" className="select-none text-center text-2xl font-semibold">
        QUÊN MẬT KHẨU
      </Typography>
      <form action="#" method="POST" onSubmit={handleSubmitForm}>
        <AppInput
          label="Email"
          isRequired
          errorMessage={errors.email}
          id="email"
          value={email}
          type="text"
          name="email"
          placeholder="Nhập email của bạn"
          onFocus={() => handleFocusInput('email')}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
        />

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
      </form>
    </div>
  );
}

export default ForgotPasswordForm;
