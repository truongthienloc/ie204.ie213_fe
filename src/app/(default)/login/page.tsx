import { Metadata } from 'next';
import Image from 'next/image';

import { APP_LOGO_PATH } from '~/constants';
import LoginForm from '~/modules/auth/components/LoginForm';

export function generateMetadata(): Metadata {
  return {
    title: 'Bếp UIT - Đăng nhập',
  };
}

function UserLoginPage() {
  return (
    <>
      <div className="row row flex min-h-[100vh] items-center justify-center py-4">
        <div className="col col-lg-6 col-md-4 col-sm-0">
          <Image
            className="w-full rounded-full object-cover object-center"
            alt="Bếp UIT logo"
            src={APP_LOGO_PATH}
            width={100}
            height={100}
          />
        </div>
        <div className="col col-lg-6 col-md-8 col-sm-12">
          <LoginForm />
        </div>
      </div>
    </>
  );
}

export default UserLoginPage;
