'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

import styles from '~/styles/user.module.scss';
import { userSidebarItems, type NavbarItem } from '~/configs/navbar';
import { useAuth } from '~/stores/auth';
import { clientInstance } from '~/services/axios';
import { useCart } from '~/stores/cart/useCart';
import ROUTES from '~/constants/routes';

function UserSidebar() {
  const { user, logout } = useAuth();
  const pathName = usePathname();
  const router = useRouter();
  const { removeAll } = useCart();

  const handleLogout = () => {
    clientInstance.removeAccessToken();
    logout();
    removeAll();
    router.replace(ROUTES.HOME);
  };

  return (
    <>
      <div className={styles.sidebar}>
        <div>
          <img src={user?.avatar.link ?? '/images/default_user.png'} alt="User avatar" className={styles.avatar} />
          <h2>{user?.username}</h2>
        </div>
        <nav className={styles['nav__container']}>
          {userSidebarItems.map((item: NavbarItem) => {
            const isActive = pathName.includes(item?.href);

            return (
              <Link
                key={item?.id}
                className={`${styles['nav__item']} ${isActive ? styles.active : ''}`}
                href={item?.href}
              >
                {item?.icon}
                {item?.text}
              </Link>
            );
          })}
        </nav>
        <button className={styles.btn} onClick={handleLogout}>
          Đăng xuất
        </button>
      </div>
    </>
  );
}

export default UserSidebar;
