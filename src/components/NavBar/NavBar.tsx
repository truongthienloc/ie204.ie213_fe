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
        <header className={clsx('w-full flex flex-col shadow-md bg-third', styles.header)}>
            <div className={styles.inner}>
                <div className={clsx(styles.part)}>
                    <Link href={'/'} className={styles.logoLink}>
                        <Image
                            className={styles.logoImage}
                            src={'/logos/bepuit_logo.svg'}
                            alt="Bếp UIT logo"
                            width={100}
                            height={100}
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
                                        'py-2 px-4 bg-primary text-center text-white font-bold rounded-lg',
                                        styles.btn,
                                    )}
                                    href={'/login'}
                                >
                                    Đăng nhập
                                </Link>
                                <Link
                                    className={clsx(
                                        'py-2 px-4 text-center text-secondary font-bold rounded-lg hover:text-primary',
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
