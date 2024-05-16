'use client'
import clsx from 'clsx'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import Link from 'next/link'
import NavItem from './NavItem'
import NavDrawer from './NavDrawer'
import { usePathname, useRouter } from 'next/navigation'
import { navbarItems } from '~/data'
import styles from '../../styles/navbar.module.scss'
import { NavbarItem } from '~/types/NavbarItem'
import { useAuth } from '~/stores/auth'
import { clientInstance } from '~/services/axios'
import { useCart } from '~/stores/cart/useCart'
import { SearchBox } from '../SearchBox'

function NavBar() {
    const pathname = usePathname()
    const { isLogin, avatar, logout } = useAuth()
    const { total, removeAll } = useCart()
    const router = useRouter()

    const handleLogout = () => {
        clientInstance.removeAccessToken()
        logout()
        removeAll()
        router.replace('/')
    }

    return (
        <header className={clsx('flex w-full flex-col bg-third shadow-md', styles.header)}>
            <div className={styles.inner}>
                <div className={clsx(styles.part)}>
                    <Link href={'/'} className={styles.logoLink}>
                        <img
                            loading="lazy"
                            className={styles.logoImage}
                            src={'/logos/bepuit_logo.svg'}
                            alt="Logo của bếp UIT"
                        />
                    </Link>
                    <nav>
                        <ul className={styles.navigation}>
                            {navbarItems.map((item: NavbarItem) => {
                                let isActive = pathname.startsWith(item?.href)
                                if (item?.href === '/' && pathname !== '/') isActive = false
                                return (
                                    <NavItem
                                        key={item.id}
                                        item={item}
                                        className={styles.item}
                                        isActive={isActive}
                                    />
                                )
                            })}
                        </ul>
                    </nav>
                </div>
                {isLogin ? (
                    <div className={styles.searchBoxLogin}>
                        <SearchBox />
                    </div>
                ) : (
                    <div className={styles.searchBoxUnLogin}>
                        <SearchBox />
                    </div>
                )}

                <div className={styles.part}>
                    <Link className={styles.cart} href={isLogin ? '/cart' : '/login'}>
                        <ShoppingCartOutlinedIcon className={styles.cartIcon} />
                        <span className={styles.cartBadge}>{total}</span>
                    </Link>

                    <div className={styles.account}>
                        {isLogin ? (
                            <>
                                <div className={styles.user}>
                                    <img
                                        loading="lazy"
                                        src={avatar || '/images/default_user.png'}
                                        alt="User avatar"
                                        width={10}
                                        height={10}
                                        className={styles.avatar}
                                    />
                                    <ul className={styles['option_box']}>
                                        <li>
                                            <Link href={'/user/profile'}>Tài khoản của tôi</Link>
                                        </li>
                                        <li>
                                            <Link href={'/user/order'}>Thông tin đơn hàng</Link>
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
                                    href={'/login'}
                                >
                                    Đăng nhập
                                </Link>
                                <Link
                                    className={clsx(
                                        'rounded-lg px-4 py-2 text-center font-bold text-secondary',
                                        styles.btn,
                                    )}
                                    href={'/signup'}
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
    )
}

export default NavBar
