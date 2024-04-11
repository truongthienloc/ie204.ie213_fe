'use client'
import clsx from 'clsx'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import Link from 'next/link'
import NavItem from './NavItem'
import NavDrawer from './NavDrawer'
import Image from 'next/image'
import { useState } from 'react'

import { navbarItems } from '~/data'
import styles from '../../styles/navbar.module.scss'
import { NavbarItem } from '~/types/NavbarItem'

function NavBar() {
    const [isAuthentication, setIsAuthentication] = useState<boolean>(false)

    return (
        <header className={clsx('flex w-full flex-col bg-third shadow-md', styles.header)}>
            <div className={styles.inner}>
                <div className={clsx(styles.part)}>
                    <Link href={'/'} className={styles.logoLink}>
                        <img
                            className={styles.logoImage}
                            src={'logos/bepuit_logo.svg'}
                            alt="Bếp UIT logo"
                        />
                    </Link>
                    <ul className={styles.navigation}>
                        {navbarItems.map((item: NavbarItem) => (
                            <NavItem key={item.id} item={item} className={styles.item} />
                        ))}
                    </ul>
                </div>

                <div className={styles.part}>
                    <Link className={styles.cart} href={'/cart'}>
                        <ShoppingCartOutlinedIcon className={styles.cartIcon} />
                        <span className={styles.cartBadge}>0</span>
                    </Link>

                    <div className={styles.account}>
                        {isAuthentication ? (
                            <>
                                <Image
                                    src={'' || '/images/default_profile_image.svg'}
                                    alt="Profile Image"
                                    width={10}
                                    height={10}
                                    className={styles.avatar}
                                />
                            </>
                        ) : (
                            <>
                                <Link
                                    className={clsx(
                                        'rounded-lg px-4 py-2 text-center font-bold hover:text-primary',
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
