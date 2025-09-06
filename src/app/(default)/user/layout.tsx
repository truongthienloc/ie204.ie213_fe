import { Metadata } from 'next';

import UserSidebar from '~/components/layouts/UserSidebar';

type UserLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export function generateMetadata(): Metadata {
  return {
    title: 'Bếp UIT - Thông tin tài khoản',
  };
}

function UserLayout({ children }: UserLayoutProps) {
  return (
    <>
      <div className="row py-16">
        <div className="col lg-3 md-3 sm-3">
          <UserSidebar />
        </div>
        <div className="col lg-9 md-9 sm-9">
          <div className="min-h-[500px] rounded border border-solid border-primary p-4">{children}</div>
        </div>
      </div>
    </>
  );
}

export default UserLayout;
