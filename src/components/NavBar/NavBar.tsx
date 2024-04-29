'use client'
import clsx from 'clsx'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import Link from 'next/link'
import NavItem from './NavItem'
import NavDrawer from './NavDrawer'
import { usePathname } from 'next/navigation'

import { navbarItems } from '~/data'
import styles from '../../styles/navbar.module.scss'
import { NavbarItem } from '~/types/NavbarItem'
import { useAuth } from '~/stores/auth'
import { useCart } from '~/stores/cart/useCart'

function NavBar() {
    const pathname = usePathname()
    const { isLogin, avatar } = useAuth()
    const cartTotal = useCart((state) => state.total)
    return (
        <header className={clsx('flex w-full flex-col bg-third shadow-md', styles.header)}>
            <div className={styles.inner}>
                <div className={clsx(styles.part)}>
                    <Link href={'/'} className={styles.logoLink}>
                        <img
                            className={styles.logoImage}
                            src={'/logos/bepuit_logo.svg'}
                            alt="Bếp UIT logo"
                        />
                    </Link>
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
                </div>

                <div className={styles.part}>
                    <Link className={styles.cart} href={isLogin ? '/cart' : '/login'}>
                        <ShoppingCartOutlinedIcon className={styles.cartIcon} />
                        <span className={styles.cartBadge}>{cartTotal}</span>
                    </Link>

                    <div className={styles.account}>
                        {isLogin ? (
                            <>
                                <Link href="/user">
                                    <img
                                        src={avatar || '/images/default_user.png'}
                                        alt="Profile Image"
                                        width={10}
                                        height={10}
                                        className={styles.avatar}
                                    />
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    className={clsx(
                                        'rounded-lg px-4 py-2 text-center font-bold text-secondary hover:text-primary',
                                    )}
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
