'use client'
import clsx from 'clsx'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import Link from 'next/link'
import NavItem from './NavItem'
import NavDrawer from './NavDrawer'
import { usePathname } from 'next/navigation'
import { getCart } from '~/services/axios/actions/cart.action'
import { usePathname, useRouter } from 'next/navigation'
import { navbarItems } from '~/data'
import styles from '../../styles/navbar.module.scss'
import { NavbarItem } from '~/types/NavbarItem'
import { useAuth } from '~/stores/auth'
import { useCart } from '~/stores/cart/useCart'
import { useEffect } from 'react'
import { clientInstance } from '~/services/axios'

function NavBar() {
    const pathname = usePathname()
    const { isLogin, avatar } = useAuth()
    const cartTotal = useCart((state) => state.total)
    const loadCart = useCart((state) => state.loadProduct)
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await getCart()
                loadCart(res)
            } catch (error) {
                console.log(error)
            }
        }
        if (isLogin === true) {
            fetchCart()
        }
    }, [isLogin])
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
                                <div className={styles.user}>
                                    <img
                                        src={avatar || '/images/default_user.png'}
                                        alt="Profile Image"
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
