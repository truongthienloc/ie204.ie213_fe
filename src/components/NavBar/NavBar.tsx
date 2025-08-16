'use client';

import Link from 'next/link';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import cn from '~/lib/cn';
import NavItem from './NavItem';
import NavDrawer from './NavDrawer';
import { usePathname, useRouter } from 'next/navigation';
import { navbarItems, type NavbarItem } from '~/configs/navbar';
import styles from '../../styles/navbar.module.scss';
import { useAuth } from '~/stores/auth';
import { useCart } from '~/stores/cart/useCart';
import { SearchBox } from '../SearchBox';
import ROUTES from '~/constants/routes';
import { DEFAULT_USER_AVATAR_PATH, APP_LOGO_PATH } from '~/constants';

function NavBar() {
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuth();
  const { total, removeAll } = useCart();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    removeAll();
    router.replace(ROUTES.HOME);
  };

  return (
    <header className={cn('flex w-full flex-col bg-third shadow-md', styles.header)}>
      <div className={styles.inner}>
        <div className={cn(styles.part)}>
          <Link href={ROUTES.HOME} className={styles.logoLink}>
            <img loading="lazy" className={styles.logoImage} src={APP_LOGO_PATH} alt="Logo của bếp UIT" />
          </Link>
          <nav>
            <ul className={styles.navigation}>
              {navbarItems.map((item: NavbarItem) => {
                let isActive = pathname.startsWith(item?.href);
                if (item?.href === ROUTES.HOME && pathname !== ROUTES.HOME) isActive = false;
                return <NavItem key={item.id} item={item} className={styles.item} isActive={isActive} />;
              })}
            </ul>
          </nav>
        </div>

        {isAuthenticated ? (
          <div className={styles.searchBoxLogin}>
            <SearchBox />
          </div>
        ) : (
          <div className={styles.searchBoxUnLogin}>
            <SearchBox />
          </div>
        )}

        <div className={styles.part}>
          <Link className={styles.cart} href={isAuthenticated ? ROUTES.CART : ROUTES.LOGIN}>
            <ShoppingCartOutlinedIcon className={styles.cartIcon} />
            <span className={styles.cartBadge}>{total}</span>
          </Link>

          <div className={styles.account}>
            {isAuthenticated ? (
              <>
                <div className={styles.user}>
                  <img
                    loading="lazy"
                    src={user?.avatar.link ?? DEFAULT_USER_AVATAR_PATH}
                    alt="User avatar"
                    width={10}
                    height={10}
                    className={styles.avatar}
                  />
                  <ul className={styles['option_box']}>
                    <li>
                      <Link href={ROUTES.USER_PROFILE}>Tài khoản của tôi</Link>
                    </li>
                    <li>
                      <Link href={ROUTES.ORDER}>Thông tin đơn hàng</Link>
                    </li>
                    <li>
                      <button onClick={handleLogout}>Đăng xuất</button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <Link
                  className="rounded-lg px-4 py-2 text-center font-bold text-secondary hover:text-primary"
                  href={ROUTES.LOGIN}
                >
                  Đăng nhập
                </Link>
                <Link
                  className={cn('rounded-lg px-4 py-2 text-center font-bold text-secondary', styles.btn)}
                  href={ROUTES.SIGNUP}
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>
          <NavDrawer />
        </div>
      </div>
    </header>
  );
}

export default NavBar;
