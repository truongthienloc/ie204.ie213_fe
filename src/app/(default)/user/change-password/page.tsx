'use client';

import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import Typography from '@mui/material/Typography';

import styles from '~/styles/user.module.scss';
import { changePassword } from '~/services/axios/actions/user.action';
import AppInput from '~/components/ui/AppInput';
import AppButton from '~/components/ui/AppButton';

type Input = {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

function ChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Input>({});

  const handleValidateForm = async () => {
    const errors: Input = {};

    if (!oldPassword.trim()) {
      errors.oldPassword = 'Vui lòng nhập mật khẩu hiện tại';
    }

    if (!newPassword.trim()) {
      errors.newPassword = 'Vui lòng nhập mật khẩu mới';
    }

    if (!confirmPassword.trim()) {
      errors.confirmPassword = 'Vui lòng xác thực mật khẩu';
    } else if (confirmPassword.trim() !== newPassword.trim()) {
      errors.confirmPassword = 'Xác thực mật khẩu không chính xác';
    }

    setErrors(errors);

    if (!Object.keys(errors).length) {
      try {
        const res = await toast.promise(
          new Promise(async (resolve, reject) => {
            try {
              const res = changePassword(oldPassword, newPassword);
              resolve(res);
            } catch (error) {
              reject(error);
            }
          }),
          {
            pending: 'Thay đổi mật khẩu',
            success: 'Thay đổi thành công',
            error: 'Đổi mật khẩu thất bại',
          },
        );
      } catch (error: any) {
        toast.error('Email hoặc password không chính xác');
      }
    }
  };

  const handleSubmitForm = (event: FormEvent) => {
    event.preventDefault();
    handleValidateForm();
  };

  const handleFocusInput = (key: string) => {
    const newError: Input = { ...errors };
    if (key === 'oldPassword') delete newError.oldPassword;
    else if (key === 'newPassword') delete newError.newPassword;
    else if (key === 'confirmPassword') delete newError.confirmPassword;
    setErrors(newError);
  };

  return (
    <>
      <div className="w-full overflow-hidden rounded-lg border-2 border-solid border-primary bg-white p-4 shadow-md md:p-8">
        <Typography component="h2" className="select-none text-center text-2xl font-semibold">
          ĐĂNG NHẬP
        </Typography>

        <form action="#" method="POST" onSubmit={handleSubmitForm}>
          <AppInput
            isRequired
            errorMessage={errors?.oldPassword}
            id="oldPassword"
            label="Mật khẩu hiện tại"
            value={oldPassword}
            type="text"
            name="oldPassword"
            placeholder="Mật khẩu hiện tại"
            onFocus={() => handleFocusInput('oldPassword')}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setOldPassword(event.target.value)}
          />

          <AppInput
            placeholder="Mật khẩu mới"
            id="newPassword"
            isRequired
            errorMessage={errors?.newPassword}
            type="password"
            name="newPassword"
            onFocus={() => handleFocusInput('newPassword')}
            value={newPassword}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewPassword(event.target.value)}
          />

          <AppInput
            placeholder="Xác nhận mật khẩu mới"
            errorMessage={errors?.confirmPassword}
            isRequired
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            onFocus={() => handleFocusInput('confirmPassword')}
            value={confirmPassword}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(event.target.value)}
          />

          <div className="mt-4 w-full">
            <AppButton variant="primary" size="md" type="submit">
              Đăng nhập
            </AppButton>
          </div>
        </form>
      </div>
    </>
  );
}

export default ChangePasswordPage;
