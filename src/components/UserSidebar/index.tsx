'use client'

import Link from 'next/link'
import styles from '~/styles/user.module.scss'
import { userSidebarItems } from '~/data'
import { useAuth } from '~/stores/auth'
import { usePathname } from 'next/navigation'
import { clientInstance } from '~/services/axios'
import { useRouter } from 'next/navigation'
import { useCart } from '~/stores/cart/useCart'

function UserSidebar() {
    const { avatar, username, logout } = useAuth()
    const pathName = usePathname()
    const router = useRouter()
    const { removeAll } = useCart()

    const handleLogout = () => {
        clientInstance.removeAccessToken()
        logout()
        removeAll()
        router.replace('/')
    }

    return (
        <>
            <div className={styles.sidebar}>
                <div>
                    <img
                        src={avatar || '/images/default_user.png'}
                        alt="User avatar"
                        className={styles.avatar}
                    />
                    <h2>{username}</h2>
                </div>
                <nav className={styles['nav__container']}>
                    {userSidebarItems.map((item) => {
                        const isActive = pathName.includes(item?.href)

                        return (
                            <Link
                                key={item?.id}
                                className={`${styles['nav__item']} ${isActive ? styles.active : ''}`}
                                href={`/user${item?.href}`}
                            >
                                {item?.icon}
                                {item?.title}
                            </Link>
                        )
                    })}
                </nav>
                <button className={styles.btn} onClick={handleLogout}>
                    Đăng xuất
                </button>
            </div>
        </>
    )
}

export default UserSidebar
